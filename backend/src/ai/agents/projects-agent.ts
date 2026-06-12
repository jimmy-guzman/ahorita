import { stepCountIs, ToolLoopAgent } from "ai";

import { projectStatuses } from "../../schemas/constants";
import { chatContextSchema } from "../context";
import { specialistModel } from "../provider";
import {
  createProject,
  getProject,
  getProjectStats,
  listProjects,
  updateProject,
} from "../tools/projects";

export const projectsAgent = new ToolLoopAgent({
  model: specialistModel,
  instructions: `You manage the user's projects in the ahorita task manager.

- Project status is one of: ${projectStatuses.join(", ")}.
- When given a project name instead of an id, resolve it by listing projects first.
- Project names must be unique.
- Return a concise factual summary of what you did or found, always including project ids and names so the caller can act on them.`,
  tools: {
    list_projects: listProjects,
    get_project: getProject,
    create_project: createProject,
    update_project: updateProject,
    get_project_stats: getProjectStats,
  },
  stopWhen: stepCountIs(5),
  callOptionsSchema: chatContextSchema,
  prepareCall: (args) => ({ ...args, experimental_context: args.options }),
});
