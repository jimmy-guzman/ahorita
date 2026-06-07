import { count, desc, eq, sql } from "drizzle-orm";
import { Elysia, InternalServerError, t } from "elysia";

import { db } from "../db";
import { authPlugin } from "../middleware/auth";
import { selectProjectSchema } from "../models/projects";
import { projects, tasks } from "../schemas";
import { projectRoutes } from "./projects.$projectId";

const tags = ["Project"];

export const projectsRoutes = new Elysia({ prefix: "/projects" })
  .use(authPlugin)
  .model({
    Project: selectProjectSchema,
    Projects: t.Array(selectProjectSchema),
    ProjectStats: t.Array(
      t.Object({
        id: t.String(),
        name: t.String(),
        Backlog: t.Number(),
        Todo: t.Number(),
        "In Progress": t.Number(),
        Done: t.Number(),
        Canceled: t.Number(),
      }),
    ),
  })
  .get(
    "",
    async ({ user }) => {
      return await db
        .select()
        .from(projects)
        .where(eq(projects.userId, user.id))
        .orderBy(desc(projects.updatedAt));
    },
    {
      auth: true,
      response: "Projects",
      detail: { tags, summary: "List Projects" },
    },
  )
  .post(
    "",
    async ({ body, user }) => {
      const [project] = await db
        .insert(projects)
        .values({ ...body, userId: user.id })
        .returning();

      if (!project) {
        throw new InternalServerError();
      }

      return project;
    },
    {
      auth: true,
      body: t.Pick(selectProjectSchema, ["name", "description"]),
      response: "Project",
      detail: { tags, summary: "Create Project" },
    },
  )
  .get(
    "/stats",
    async ({ user }) => {
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
          Canceled: count(
            sql`case when ${tasks.status} = 'Canceled' then 1 end`,
          ),
        })
        .from(projects)
        .leftJoin(tasks, eq(tasks.projectId, projects.id))
        .where(eq(projects.userId, user.id))
        .groupBy(projects.id)
        .orderBy(desc(projects.updatedAt));
    },
    {
      auth: true,
      response: "ProjectStats",
      detail: { tags, summary: "List Project Stats" },
    },
  )
  .use(projectRoutes);
