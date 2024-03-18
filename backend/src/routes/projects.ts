import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { ProjectSchema } from "../models/projects";
import { TaskSchema } from "../models/tasks";
import { projects } from "../schemas";
import { projectRoutes } from "./projects.$projectId";

const tags = ["Project"];

export const projectsRoutes = new Elysia({ prefix: "/projects" })
  .use(auth)
  .model({ project: ProjectSchema, task: TaskSchema })
  .get(
    "",
    async ({ user }) => {
      const userId = user?.id ?? "";

      return await db.query.projects.findMany({
        where: eq(projects.userId, userId),
      });
    },
    {
      response: t.Array(ProjectSchema),
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
      body: t.Pick(ProjectSchema, ["name", "description", "icon"]),
      response: "project",
      detail: { tags, summary: "Add a new project" },
    },
  )
  .use(projectRoutes);
