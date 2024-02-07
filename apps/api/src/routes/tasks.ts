import { eq } from 'drizzle-orm';
import { Elysia, NotFoundError, t } from 'elysia';

import { db } from '../db';
import { TaskDto } from '../models/tasks';
import { tasks } from '../schema';

const Params = t.Object({ id: t.String() });

export const tasksRoutes = new Elysia().group(
  '/tasks',
  { detail: { tags: ['Tasks'] } },
  (app) =>
    app
      .patch(
        '/:id',
        async ({ params: { id }, body }) => {
          const [task] = await db
            .update(tasks)
            .set(body)
            .where(eq(tasks.id, id))
            .returning();

          if (!task) {
            throw NotFoundError;
          }

          return task;
        },
        {
          body: t.Partial(t.Pick(TaskDto, ['name', 'completed'])),
          params: Params,
          response: TaskDto,
        }
      )
      .delete(
        '/:id',
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
        }
      )
);
