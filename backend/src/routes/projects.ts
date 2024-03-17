import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { ProjectSchema } from "../models/projects";
import { TaskSchema } from "../models/tasks";
import { projects, tasks } from "../schemas";
import { nowAsISO } from "../utils";

export const projectsRoute = new Elysia()
  .use(auth)
  .model({ project: ProjectSchema })
  .group("/projects", { detail: { tags: ["Projects"] } }, (app) =>
    app
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
        },
      )
      .get(
        "/:projectId",
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
          params: t.Object({ projectId: t.String() }),
          response: "project",
        },
      )
      .patch(
        "/:projectId",
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
          params: t.Object({ projectId: t.String() }),
          body: t.Partial(
            t.Pick(ProjectSchema, [
              "description",
              "isFavorite",
              "name",
              "icon",
            ]),
          ),
          response: "project",
        },
      )
      .delete(
        "/:projectId",
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
          params: t.Object({ projectId: t.String() }),
          response: "project",
        },
      )
      .get(
        "/:projectId/tasks",
        async ({ params: { projectId } }) => {
          return db.query.tasks.findMany({
            where: eq(tasks.projectId, projectId),
            orderBy: (tasks, { desc }) => desc(tasks.createdAt),
          });
        },
        {
          params: t.Object({ projectId: t.String() }),
          response: t.Array(TaskSchema),
        },
      )
      .post(
        "/:projectId/tasks",
        async ({ user, params: { projectId }, body }) => {
          const userId = user?.id ?? "";

          const [task] = await db
            .insert(tasks)
            .values({ ...body, projectId: projectId, userId })
            .returning();

          if (!task) {
            throw InternalServerError;
          }

          return task;
        },
        {
          params: t.Object({ projectId: t.String() }),
          body: t.Pick(TaskSchema, ["name", "priority", "dueAt", "label"]),
          response: TaskSchema,
        },
      ),
  );
