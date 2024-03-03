import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { GroupDto } from "../models/groups";
import { TaskDto } from "../models/tasks";
import { groups, tasks } from "../schemas";
import { nowAsISO } from "../utils";

export const groupsRoute = new Elysia()
  .use(auth)
  .group("/groups", { detail: { tags: ["Groups"] } }, (app) =>
    app
      .get(
        "",
        async ({ user }) => {
          const userId = user?.id ?? "";

          return db.query.groups.findMany({
            where: eq(groups.userId, userId),
          });
        },
        {
          response: t.Array(GroupDto),
        },
      )
      .post(
        "",
        async ({ body, user }) => {
          const userId = user?.id ?? "";

          const [group] = await db
            .insert(groups)
            .values({ ...body, userId })
            .returning();

          if (!group) throw InternalServerError;

          return group;
        },
        {
          body: t.Pick(GroupDto, ["name", "description"]),
          response: GroupDto,
        },
      )
      .get(
        "/:id",
        async ({ params: { id } }) => {
          const [group] = await db.query.groups.findMany({
            where: eq(groups.id, id),
            limit: 1,
          });

          if (!group) throw NotFoundError;

          return group;
        },
        {
          params: t.Object({ id: t.String() }),
          response: GroupDto,
        },
      )
      .patch(
        "/:id",
        async ({ params: { id }, body }) => {
          const [group] = await db
            .update(groups)
            .set({ ...body, updatedAt: nowAsISO() })
            .where(eq(groups.id, id))
            .returning();

          if (!group) throw NotFoundError;

          return group;
        },
        {
          params: t.Object({ id: t.String() }),
          body: t.Partial(t.Pick(GroupDto, ["description", "isFavorite"])),
          response: GroupDto,
        },
      )
      .delete(
        "/:id",
        async ({ params: { id } }) => {
          const [group] = await db
            .delete(groups)
            .where(eq(groups.id, id))
            .returning();

          if (!group) throw NotFoundError;

          return group;
        },
        {
          params: t.Object({ id: t.String() }),
          response: GroupDto,
        },
      )
      .get(
        "/:id/tasks",
        async ({ params: { id } }) => {
          return db.query.tasks.findMany({
            where: eq(tasks.groupId, id),
            orderBy: (tasks, { asc }) => [asc(tasks.dueAt)],
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
          body: t.Pick(TaskDto, ["name", "priority", "dueAt"]),
          response: TaskDto,
        },
      ),
  );
