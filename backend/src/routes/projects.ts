import { count, eq, getTableColumns, sql } from "drizzle-orm";
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
    Projects: t.Array(
      t.Composite([
        selectProjectSchema,
        t.Object({
          taskSummary: t.Object({
            total: t.Number(),
            completed: t.Number(),
          }),
        }),
      ]),
    ),
  })
  .get(
    "",
    async ({ user }) => {
      const rows = await db
        .select({
          ...getTableColumns(projects),
          total: count(tasks.id),
          completed: count(sql`case when ${tasks.status} = 'Done' then 1 end`),
        })
        .from(projects)
        .leftJoin(tasks, eq(tasks.projectId, projects.id))
        .where(eq(projects.userId, user.id))
        .groupBy(projects.id);

      return rows.map(({ total, completed, ...project }) => ({
        ...project,
        taskSummary: { total, completed },
      }));
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
    "/totals",
    async ({ user }) => {
      const projectsWithTasks = await db.query.projects.findMany({
        where: eq(projects.userId, user.id),
        orderBy: (tasks, { desc }) => desc(tasks.updatedAt),
        columns: {
          id: true,
          name: true,
        },
        with: {
          tasks: {
            columns: {
              status: true,
            },
          },
        },
      });

      return projectsWithTasks.map(({ id, name, tasks }) => {
        return {
          id,
          name,
          ...tasks.reduce(
            (acc, curr) => {
              acc[curr.status] = acc[curr.status] + 1;

              return acc;
            },
            { Backlog: 0, Todo: 0, "In Progress": 0, Done: 0, Canceled: 0 },
          ),
        };
      });
    },
    {
      auth: true,
      response: t.Array(
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
      detail: { tags, summary: "List Projects' Totals" },
    },
  )
  .use(projectRoutes);
