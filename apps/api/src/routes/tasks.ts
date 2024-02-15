import { eq } from "drizzle-orm";
import { Elysia, NotFoundError, t } from "elysia";

import { db } from "../db";
import { TaskDto } from "../models/tasks";
import { tasksTable } from "../schemas";

const Params = t.Object({ id: t.String() });

export const tasksRoutes = new Elysia().group(
  "/tasks",
  { detail: { tags: ["Tasks"] } },
  (app) =>
    app
      .patch(
        "/:id",
        async ({ params: { id }, body }) => {
          const [task] = await db
            .update(tasksTable)
            .set({ ...body, updatedAt: new Date().toISOString() })
            .where(eq(tasksTable.id, id))
            .returning();

          if (!task) {
            throw NotFoundError;
          }

          return task;
        },
        {
          body: t.Partial(t.Pick(TaskDto, ["name", "status", "priority"])),
          params: Params,
          response: TaskDto,
        },
      )
      .delete(
        "/:id",
        async ({ params: { id } }) => {
          const [task] = await db
            .delete(tasksTable)
            .where(eq(tasksTable.id, id))
            .returning();

          if (!task) {
            throw NotFoundError;
          }

          return task;
        },
        {
          params: Params,
          response: TaskDto,
        },
      ),
);
