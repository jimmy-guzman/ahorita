import { eq } from "drizzle-orm";
import { Elysia, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { TaskDto } from "../models/tasks";
import { tasks } from "../schemas";
import { nowAsISO } from "../utils";

const Params = t.Object({ id: t.String() });

export const tasksRoutes = new Elysia()
  .use(auth)
  .group("/tasks", { detail: { tags: ["Tasks"] } }, (app) =>
    app
      .patch(
        "/:id",
        async ({ params: { id }, body }) => {
          const [task] = await db
            .update(tasks)
            .set({ ...body, updatedAt: nowAsISO() })
            .where(eq(tasks.id, id))
            .returning();

          if (!task) {
            throw NotFoundError;
          }

          return task;
        },
        {
          body: t.Partial(
            t.Pick(TaskDto, ["name", "status", "priority", "labelId"]),
          ),
          params: Params,
          response: TaskDto,
        },
      )
      .delete(
        "/:id",
        async ({ params: { id } }) => {
          const [task] = await db
            .delete(tasks)
            .where(eq(tasks.id, id))
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
