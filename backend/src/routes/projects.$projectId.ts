import { eq } from "drizzle-orm";
import { Elysia, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { selectProjectSchema } from "../models/projects";
import { projects } from "../schemas";

const tags = ["Project"];

const Params = t.Object({ projectId: t.String() });

export const projectRoutes = new Elysia({ prefix: "/:projectId" })
  .use(auth)
  .model({ Project: selectProjectSchema })
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
      response: "Project",
      detail: { tags, summary: "Get Project" },
    },
  )
  .patch(
    "",
    async ({ params: { projectId }, body }) => {
      const [project] = await db
        .update(projects)
        .set(body)
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
      response: "Project",
      detail: { tags, summary: "Update Project" },
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
      response: "Project",
      detail: { tags, summary: "Delete Project" },
    },
  );
