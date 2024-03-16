import { eq } from "drizzle-orm";
import { Elysia, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { TaskDto } from "../models/tasks";
import { tasks } from "../schemas";
import { nowAsISO } from "../utils";

const Params = t.Object({ taskId: t.String() });

export const tasksRoutes = new Elysia()
  .use(auth)
  .model({ task: TaskDto })
  .group("/tasks", { detail: { tags: ["Tasks"] } }, (app) =>
    app
      .patch(
        "/:taskId",
        async ({ params: { taskId }, body }) => {
          const [task] = await db
            .update(tasks)
            .set({ ...body, updatedAt: nowAsISO() })
            .where(eq(tasks.id, taskId))
            .returning();

          if (!task) {
            throw NotFoundError;
          }

          return task;
        },
        {
          body: t.Partial(
            t.Pick(TaskDto, ["name", "status", "priority", "label"]),
          ),
          params: Params,
          response: "task",
        },
      )
      .delete(
        "/:taskId",
        async ({ params: { taskId } }) => {
          const [task] = await db
            .delete(tasks)
            .where(eq(tasks.id, taskId))
            .returning();

          if (!task) {
            throw NotFoundError;
          }

          return task;
        },
        {
          params: Params,
          response: "task",
        },
      ),
  );
