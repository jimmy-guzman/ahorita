import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { insertTaskSchema, selectTaskSchema } from "../models/tasks";
import { tasks } from "../schemas/projects";
import { taskRoutes } from "./tasks.$taskId";

const tags = ["Task"];

export const tasksRoutes = new Elysia({ prefix: "/tasks" })
  .use(auth)
  .model({ task: selectTaskSchema })
  .post(
    "",
    async ({ user, body }) => {
      const [task] = await db
        .insert(tasks)
        .values({ ...body, userId: user?.id ?? "" })
        .returning();

      if (!task) {
        throw InternalServerError;
      }

      return task;
    },
    {
      body: insertTaskSchema,
      response: "task",
      detail: { tags, summary: "Add a new task" },
    },
  )
  .get(
    "",
    async ({ query: { projectId } }) => {
      return db.query.tasks.findMany({
        where: projectId ? eq(tasks.projectId, projectId) : undefined,
        orderBy: (tasks, { desc }) => desc(tasks.createdAt),
      });
    },
    {
      query: t.Partial(t.Object({ projectId: t.String() })),
      response: t.Array(selectTaskSchema),
      detail: { tags, summary: "Find tasks" },
    },
  )
  .use(taskRoutes);
