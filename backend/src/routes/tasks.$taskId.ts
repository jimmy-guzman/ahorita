import { eq } from "drizzle-orm";
import { Elysia, NotFoundError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { selectTaskSchema } from "../models/tasks";
import { tasks } from "../schemas";

const tags = ["Task"];

const Params = t.Object({ taskId: t.String() });

export const taskRoutes = new Elysia({ prefix: "/:taskId" })
  .use(auth)
  .model({ task: selectTaskSchema })
  .patch(
    "",
    async ({ params: { taskId }, body }) => {
      const [task] = await db
        .update(tasks)
        .set(body)
        .where(eq(tasks.id, taskId))
        .returning();

      if (!task) {
        throw new NotFoundError("Task Not Found");
      }

      return task;
    },
    {
      body: t.Partial(
        t.Pick(selectTaskSchema, ["name", "status", "priority", "label"]),
      ),
      params: Params,
      response: "task",
      detail: { tags, summary: "Update Task" },
    },
  )
  .delete(
    "",
    async ({ params: { taskId } }) => {
      const [task] = await db
        .delete(tasks)
        .where(eq(tasks.id, taskId))
        .returning();

      if (!task) {
        throw new NotFoundError("Task Not Found");
      }

      return task;
    },
    {
      params: Params,
      response: "task",
      detail: { tags, summary: "Delete Task" },
    },
  )
  .get(
    "",
    async ({ params: { taskId } }) => {
      const task = await db.query.tasks.findFirst({
        where: eq(tasks.id, taskId),
      });

      if (!task) {
        throw new NotFoundError("Task Not Found");
      }

      return task;
    },
    {
      params: Params,
      response: "task",
      detail: { tags, summary: "Get Task" },
    },
  );
