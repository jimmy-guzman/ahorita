import { tool } from "ai";
import { and, count, desc, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "../../db";
import { projects, tasks } from "../../schemas";
import { projectStatuses } from "../../schemas/constants";
import { getChatContext } from "../context";

export const listProjects = tool({
  description:
    "List all of the user's projects. Call this when the user asks about their projects or when you need to resolve a project name to its id.",
  inputSchema: z.object({}),
  execute: async (_input, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    return await db
      .select()
      .from(projects)
      .where(eq(projects.userId, userId))
      .orderBy(desc(projects.updatedAt));
  },
});

export const getProject = tool({
  description: "Get a single project by its id.",
  inputSchema: z.object({ projectId: z.string() }),
  execute: async ({ projectId }, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
      .limit(1);

    return project ?? { error: "Project not found" };
  },
});

export const createProject = tool({
  description:
    "Create a new project. Call this when the user asks to add or start a new project. Project names must be unique.",
  inputSchema: z.object({
    name: z.string(),
    description: z.string(),
  }),
  execute: async (input, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    const [project] = await db
      .insert(projects)
      .values({ ...input, userId })
      .returning();

    return project ?? { error: "Failed to create project" };
  },
});

export const updateProject = tool({
  description:
    "Update a project's name, description, status, or favorite flag. Call this when the user asks to rename, complete, reopen, favorite, or edit a project.",
  inputSchema: z.object({
    projectId: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.enum(projectStatuses).optional(),
    isFavorite: z.boolean().optional(),
  }),
  execute: async ({ projectId, ...changes }, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    const [project] = await db
      .update(projects)
      .set(changes)
      .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
      .returning();

    return project ?? { error: "Project not found" };
  },
});

export const getProjectStats = tool({
  description:
    "Get per-project task counts grouped by task status. Call this when the user asks about progress or how much work is left.",
  inputSchema: z.object({}),
  execute: async (_input, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    return await db
      .select({
        id: projects.id,
        name: projects.name,
        Backlog: count(sql`case when ${tasks.status} = 'Backlog' then 1 end`),
        Todo: count(sql`case when ${tasks.status} = 'Todo' then 1 end`),
        "In Progress": count(
          sql`case when ${tasks.status} = 'In Progress' then 1 end`,
        ),
        Done: count(sql`case when ${tasks.status} = 'Done' then 1 end`),
        Canceled: count(sql`case when ${tasks.status} = 'Canceled' then 1 end`),
      })
      .from(projects)
      .leftJoin(tasks, eq(tasks.projectId, projects.id))
      .where(eq(projects.userId, userId))
      .groupBy(projects.id)
      .orderBy(desc(projects.updatedAt));
  },
});

export const deleteProject = tool({
  description:
    "Permanently delete a project and all of its tasks. Call this only when the user explicitly asks to delete a project. Resolve the project name to its id first.",
  inputSchema: z.object({
    projectId: z.string(),
    projectName: z
      .string()
      .describe("The project's name, shown to the user for confirmation"),
  }),
  needsApproval: true,
  execute: async ({ projectId }, { experimental_context }) => {
    const { userId } = getChatContext(experimental_context);

    const [project] = await db
      .delete(projects)
      .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
      .returning();

    return project ?? { error: "Project not found" };
  },
});
