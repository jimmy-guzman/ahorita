import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { ProjectDto } from "../models/projects";
import { TaskDto } from "../models/tasks";
import { projects, tasks } from "../schemas";
import { nowAsISO } from "../utils";

export const projectsRoute = new Elysia()
  .use(auth)
  .group("/projects", { detail: { tags: ["Projects"] } }, (app) =>
    app
      .get(
        "",
        async ({ user }) => {
          const userId = user?.id ?? "";

          return db.query.projects.findMany({
            where: eq(projects.userId, userId),
          });
        },
        {
          response: t.Array(ProjectDto),
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

          if (!project) throw InternalServerError;

          return project;
        },
        {
          body: t.Pick(ProjectDto, ["name", "description", "icon"]),
          response: ProjectDto,
        },
      )
      .get(
        "/:id",
        async ({ params: { id } }) => {
          const [project] = await db.query.projects.findMany({
            where: eq(projects.id, id),
            limit: 1,
          });

          if (!project) throw NotFoundError;

          return project;
        },
        {
          params: t.Object({ id: t.String() }),
          response: ProjectDto,
        },
      )
      .patch(
        "/:id",
        async ({ params: { id }, body }) => {
          const [project] = await db
            .update(projects)
            .set({ ...body, updatedAt: nowAsISO() })
            .where(eq(projects.id, id))
            .returning();

          if (!project) throw NotFoundError;

          return project;
        },
        {
          params: t.Object({ id: t.String() }),
          body: t.Partial(
            t.Pick(ProjectDto, ["description", "isFavorite", "name", "icon"]),
          ),
          response: ProjectDto,
        },
      )
      .delete(
        "/:id",
        async ({ params: { id } }) => {
          const [project] = await db
            .delete(projects)
            .where(eq(projects.id, id))
            .returning();

          if (!project) throw NotFoundError;

          return project;
        },
        {
          params: t.Object({ id: t.String() }),
          response: ProjectDto,
        },
      )
      .get(
        "/:id/tasks",
        async ({ params: { id } }) => {
          return db.query.tasks.findMany({
            where: eq(tasks.groupId, id),
            orderBy: (tasks, { desc }) => desc(tasks.createdAt),
          });
        },
        {
          params: t.Object({ id: t.String() }),
          response: t.Array(TaskDto),
        },
      )
      .post(
        "/:id/tasks",
        async ({ user, params: { id }, body }) => {
          const userId = user?.id ?? "";

          const [task] = await db
            .insert(tasks)
            .values({ ...body, groupId: id, userId })
            .returning();

          if (!task) throw InternalServerError;

          return task;
        },
        {
          params: t.Object({ id: t.String() }),
          body: t.Pick(TaskDto, ["name", "priority", "dueAt", "label"]),
          response: TaskDto,
        },
      ),
  );
