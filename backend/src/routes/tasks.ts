import { Elysia, InternalServerError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { insertTaskSchema, selectTaskSchema } from "../models/tasks";
import { tasks } from "../schemas/projects";
import { taskRoutes } from "./tasks.$taskId";

const tags = ["Task"];

export const tasksRoutes = new Elysia({ prefix: "/tasks" })
  .use(auth)
  .model({ Task: selectTaskSchema })
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
      response: "Task",
      detail: { tags, summary: "Create Task" },
    },
  )
  .get(
    "",
    async ({
      user,
      query: { projectId, priority, status, name, label, id },
    }) => {
      return db.query.tasks.findMany({
        where: (tasks, { eq, and }) => {
          return and(
            user?.id ? eq(tasks.userId, user.id) : undefined,
            projectId ? eq(tasks.projectId, projectId) : undefined,
            priority ? eq(tasks.priority, priority) : undefined,
            status ? eq(tasks.status, status) : undefined,
            name ? eq(tasks.name, name) : undefined,
            label ? eq(tasks.label, label) : undefined,
            id ? eq(tasks.id, id) : undefined,
          );
        },
        orderBy: (tasks, { desc }) => desc(tasks.updatedAt),
      });
    },
    {
      query: t.Omit(t.Partial(selectTaskSchema), [
        "userId",
        "createdAt",
        "updatedAt",
      ]),
      response: t.Array(selectTaskSchema),
      detail: { tags, summary: "List Tasks" },
    },
  )
  .use(taskRoutes);
