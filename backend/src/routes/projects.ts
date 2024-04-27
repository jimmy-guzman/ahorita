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
  .use(projectRoutes);
