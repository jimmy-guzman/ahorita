import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { selectProjectSchema } from "../models/projects";
import { selectTaskSchema } from "../models/tasks";
import { projects } from "../schemas";
import { projectRoutes } from "./projects.$projectId";

const tags = ["Project"];

export const projectsRoutes = new Elysia({ prefix: "/projects" })
  .use(auth)
  .model({ project: selectProjectSchema, task: selectTaskSchema })
  .get(
    "",
    async ({ user }) => {
      const userId = user?.id ?? "";

      return await db.query.projects.findMany({
        where: eq(projects.userId, userId),
      });
    },
    {
      response: t.Array(selectProjectSchema),
      detail: { tags, summary: "Find projects" },
    },
  )
  .post(
    "",
    async ({ body, user }) => {
      const userId = user?.id ?? "";

      const [project] = await db
        .insert(projects)
        .values({ ...body, userId })
        .returning();

      if (!project) {
        throw InternalServerError;
      }

      return project;
    },
    {
      body: t.Pick(selectProjectSchema, ["name", "description"]),
      response: "project",
      detail: { tags, summary: "Add a new project" },
    },
  )
  .get(
    "/totals",
    async ({ user }) => {
      const userId = user?.id ?? "";
      const projectsWithTasks = await db.query.projects.findMany({
        where: eq(projects.userId, userId),
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
      detail: { tags, summary: "Find projects' totals" },
    },
  )
  .use(projectRoutes);
