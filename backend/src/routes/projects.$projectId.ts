import { eq } from "drizzle-orm";
import { Elysia, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { selectProjectSchema } from "../models/projects";
import { selectTaskSchema } from "../models/tasks";
import { projects } from "../schemas";
import { nowAsISO } from "../utils";

const tags = ["Project"];

const Params = t.Object({ projectId: t.String() });

export const projectRoutes = new Elysia({ prefix: "/:projectId" })
  .use(auth)
  .model({ project: selectProjectSchema, task: selectTaskSchema })
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
        t.Pick(selectProjectSchema, [
          "description",
          "isFavorite",
          "name",
          "isDone",
        ]),
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
  );
