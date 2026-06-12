import { tool } from "ai";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "../../db";
import { tasks } from "../../schemas";
import { labels, priorities, statuses } from "../../schemas/constants";
import { getChatContext } from "../context";

export const listTasks = tool({
  description:
    "List the user's tasks, optionally filtered by project, status, priority, or label. Call this when the user asks about their tasks or when you need to resolve a task name to its id.",
  inputSchema: z.object({
    projectId: z.string().optional(),
    status: z.enum(statuses).optional(),
    priority: z.enum(priorities).optional(),
    label: z.enum(labels).optional(),
  }),
  execute: async (
    { projectId, status, priority, label },
    { experimental_context },
  ) => {
    const { userId } = getChatContext(experimental_context);

    return await db.query.tasks.findMany({
      where: (tasks, { eq, and }) => {
        return and(
          eq(tasks.userId, userId),
          projectId ? eq(tasks.projectId, projectId) : undefined,
          status ? eq(tasks.status, status) : undefined,
          priority ? eq(tasks.priority, priority) : undefined,
          label ? eq(tasks.label, label) : undefined,
        );
      },
      orderBy: (tasks, { desc }) => desc(tasks.updatedAt),
      columns: { userId: false },
      with: {
        project: { columns: { id: true, name: true } },
      },
    });
  },
});

export const getTask = tool({
  description: "Get a single task by its id, including its project.",
  inputSchema: z.object({ taskId: z.string() }),
  execute: async ({ taskId }, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    const task = await db.query.tasks.findFirst({
      where: and(eq(tasks.id, taskId), eq(tasks.userId, userId)),
      columns: { userId: false },
      with: {
        project: { columns: { id: true, name: true } },
      },
    });

    return task ?? { error: "Task not found" };
  },
});

export const createTask = tool({
  description:
    "Create a new task in a project. Call this when the user asks to add a task or todo. Resolve the project name to its id first (list projects if needed).",
  inputSchema: z.object({
    name: z.string(),
    projectId: z.string(),
    status: z.enum(statuses).optional(),
    priority: z.enum(priorities).optional(),
    label: z.enum(labels).optional(),
  }),
  execute: async (input, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    const [task] = await db
      .insert(tasks)
      .values({ ...input, userId })
      .returning();

    return task ?? { error: "Failed to create task" };
  },
});

export const updateTask = tool({
  description:
    "Update a task's name, status, priority, or label. Call this when the user asks to rename, complete, reprioritize, or relabel a task.",
  inputSchema: z.object({
    taskId: z.string(),
    name: z.string().optional(),
    status: z.enum(statuses).optional(),
    priority: z.enum(priorities).optional(),
    label: z.enum(labels).optional(),
  }),
  execute: async ({ taskId, ...changes }, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    const [task] = await db
      .update(tasks)
      .set(changes)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning();

    return task ?? { error: "Task not found" };
  },
});

export const deleteTask = tool({
  description:
    "Permanently delete a task. Call this only when the user explicitly asks to delete a task. Resolve the task name to its id first.",
  inputSchema: z.object({
    taskId: z.string(),
    taskName: z
      .string()
      .describe("The task's name, shown to the user for confirmation"),
  }),
  needsApproval: true,
  execute: async ({ taskId }, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    const [task] = await db
      .delete(tasks)
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)))
      .returning();

    return task ?? { error: "Task not found" };
  },
});
