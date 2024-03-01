import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { TagDto } from "../models/tags";
import { TaskDto } from "../models/tasks";
import { tags, tasks } from "../schemas";

export const tagsRoute = new Elysia()
  .use(auth)
  .group("/tags", { detail: { tags: ["Tags"] } }, (app) =>
    app
      .get(
        "",
        async ({ user }) => {
          const userId = user?.id ?? "";

          return db.query.tags.findMany({
            where: eq(tags.userId, userId),
          });
        },
        {
          response: t.Array(TagDto),
        },
      )
      .post(
        "",
        async ({ body, user }) => {
          const userId = user?.id ?? "";

          const [tag] = await db
            .insert(tags)
            .values({ ...body, userId })
            .returning();

          if (!tag) throw InternalServerError;

          return tag;
        },
        {
          body: t.Pick(TagDto, ["name", "description"]),
          response: TagDto,
        },
      )
      .get(
        "/:id",
        async ({ params: { id } }) => {
          const [tag] = await db.query.tags.findMany({
            where: eq(tags.id, id),
            limit: 1,
          });

          if (!tag) throw NotFoundError;

          return tag;
        },
        {
          params: t.Object({ id: t.String() }),
          response: TagDto,
        },
      )
      .delete(
        "/:id",
        async ({ params: { id } }) => {
          const tag = await db.transaction(async (tx) => {
            const [tag] = await tx
              .delete(tags)
              .where(eq(tags.id, id))
              .returning();

            if (!tag) throw NotFoundError;

            await tx.delete(tasks).where(eq(tasks.tagId, id));

            return tag;
          });

          return tag;
        },
        {
          params: t.Object({ id: t.String() }),
          response: TagDto,
        },
      )
      .get(
        "/:id/tasks",
        async ({ params: { id } }) => {
          return db.query.tasks.findMany({
            where: eq(tasks.tagId, id),
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
            .values({ ...body, tagId: id, userId })
            .returning();

          if (!task) throw InternalServerError;

          return task;
        },
        {
          params: t.Object({ id: t.String() }),
          body: t.Pick(TaskDto, ["name", "priority", "dueAt"]),
          response: TaskDto,
        },
      ),
  );
