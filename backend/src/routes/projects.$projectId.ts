import { eq } from "drizzle-orm";
import { Elysia, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { ProjectSchema } from "../models/projects";
import { TaskSchema } from "../models/tasks";
import { projects } from "../schemas";
import { nowAsISO } from "../utils";

import { tasksRoutes } from "./projects.$projectId.tasks";

const tags = ["Project"];

const Params = t.Object({ projectId: t.String() });

export const projectRoutes = new Elysia({ prefix: "/:projectId" })
  .use(auth)
  .model({ project: ProjectSchema, task: TaskSchema })
  .get(
    "",
    async ({ params: { projectId } }) => {
      const [project] = await db.query.projects.findMany({
        where: eq(projects.id, projectId),
        limit: 1,
      });

      if (!project) {
        throw NotFoundError;
      }

      return project;
    },
    {
      params: Params,
      response: "project",
      detail: { tags, summary: "Find project by id" },
    },
  )
  .patch(
    "",
    async ({ params: { projectId }, body }) => {
      const [project] = await db
        .update(projects)
        .set({ ...body, updatedAt: nowAsISO() })
        .where(eq(projects.id, projectId))
        .returning();

      if (!project) {
        throw NotFoundError;
      }

      return project;
    },
    {
      params: Params,
      body: t.Partial(
        t.Pick(ProjectSchema, ["description", "isFavorite", "name", "icon"]),
      ),
      response: "project",
      detail: { tags, summary: "Updates a project" },
    },
  )
  .delete(
    "",
    async ({ params: { projectId } }) => {
      const [project] = await db
        .delete(projects)
        .where(eq(projects.id, projectId))
        .returning();

      if (!project) {
        throw NotFoundError;
      }

      return project;
    },
    {
      params: Params,
      response: "project",
      detail: { tags, summary: "Deletes a project" },
    },
  )
  .use(tasksRoutes);
