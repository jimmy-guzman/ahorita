import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, t } from "elysia";

import { db } from "../db";
import { auth } from "../middleware/auth";
import { selectProjectSchema } from "../models/projects";
import { insertTaskSchema, selectTaskSchema } from "../models/tasks";
import { tasks } from "../schemas";

const tags = ["Project", "Task"];

export const tasksRoutes = new Elysia({ prefix: "/tasks" })
  .use(auth)
  .model({ project: selectProjectSchema, task: selectTaskSchema })
  .get(
    "",
    async ({ params: { projectId } }) => {
      return db.query.tasks.findMany({
        where: eq(tasks.projectId, projectId),
        orderBy: (tasks, { desc }) => desc(tasks.createdAt),
      });
    },
    {
      params: t.Object({ projectId: t.String() }),
      response: t.Array(selectTaskSchema),
      detail: { tags, summary: "Find a project's tasks" },
    },
  )
  .post(
    "",
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
      body: insertTaskSchema,
      response: "task",
      detail: { tags, summary: "Add a new task to a project" },
    },
  );
