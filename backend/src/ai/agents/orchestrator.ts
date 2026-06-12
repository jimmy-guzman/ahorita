import { type InferAgentUIMessage, stepCountIs, ToolLoopAgent, tool } from "ai";
import { z } from "zod";

import { chatContextSchema, getChatContext } from "../context";
import { orchestratorModel } from "../provider";
import { deleteProject } from "../tools/projects";
import { deleteTask } from "../tools/tasks";
import { projectsAgent } from "./projects-agent";
import { tasksAgent } from "./tasks-agent";

const specialistInputSchema = z.object({
  request: z
    .string()
    .describe("A complete, self-contained request for the specialist"),
});

function specialistTool(
  description: string,
  agent: typeof projectsAgent | typeof tasksAgent,
) {
  return tool({
    description,
    inputSchema: specialistInputSchema,
    execute: async ({ request }, { experimental_context, abortSignal }) => {
      const result = await agent.generate({
        prompt: request,
        options: getChatContext(experimental_context),
        abortSignal,
      });

      return result.text;
    },
  });
}

const projectsSpecialist = specialistTool(
  "Delegate project work (listing, creating, updating, stats) to the projects specialist. Phrase the request with everything it needs, including any ids you already know. Do NOT use this for deletions.",
  projectsAgent,
);

const tasksSpecialist = specialistTool(
  "Delegate task work (listing, creating, updating) to the tasks specialist. Phrase the request with everything it needs, including any ids you already know. Do NOT use this for deletions.",
  tasksAgent,
);

export const orchestrator = new ToolLoopAgent({
  model: orchestratorModel,
  instructions: `You are the assistant for ahorita, the user's project and task manager. You operate the app on the user's behalf.

- Delegate project operations to projects_specialist and task operations to tasks_specialist. Give them complete, self-contained requests including any ids you already know.
- Deletions are yours alone: use delete_project or delete_task directly (never a specialist). The user will be asked to approve each deletion; after approval, confirm what was deleted. If they deny it, acknowledge and stop.
- Resolve names to ids via the specialists before deleting.
- Only act on what the user asked for. Keep responses brief and conversational.
- Respond in markdown. Whenever you mention a specific project or task, link its name so the user can navigate to it: [name](/projects/{projectId}) for projects, [name](/tasks/{taskId}) for tasks. Never show raw ids unless the user asks for them.`,
  tools: {
    projects_specialist: projectsSpecialist,
    tasks_specialist: tasksSpecialist,
    delete_project: deleteProject,
    delete_task: deleteTask,
  },
  stopWhen: stepCountIs(8),
  callOptionsSchema: chatContextSchema,
  prepareCall: (args) => ({ ...args, experimental_context: args.options }),
});

export type OrchestratorUIMessage = InferAgentUIMessage<typeof orchestrator>;
