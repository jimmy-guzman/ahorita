import { stepCountIs, ToolLoopAgent } from "ai";

import { labels, priorities, statuses } from "../../schemas/constants";
import { chatContextSchema } from "../context";
import { specialistModel } from "../provider";
import { createTask, getTask, listTasks, updateTask } from "../tools/tasks";

export const tasksAgent = new ToolLoopAgent({
  model: specialistModel,
  instructions: `You manage the user's tasks in the ahorita task manager.

- Task status is one of: ${statuses.join(", ")}.
- Task priority is one of: ${priorities.join(", ")}.
- Task label is one of: ${labels.join(", ")}.
- Every task belongs to a project. Creating a task requires a projectId.
- When given a task or project name instead of an id, resolve it by listing first (filter tasks by projectId when the project is known).
- Return a concise factual summary of what you did or found, always including task ids and names so the caller can act on them.`,
  tools: {
    list_tasks: listTasks,
    get_task: getTask,
    create_task: createTask,
    update_task: updateTask,
  },
  stopWhen: stepCountIs(5),
  callOptionsSchema: chatContextSchema,
  prepareCall: (args) => ({ ...args, experimental_context: args.options }),
});
