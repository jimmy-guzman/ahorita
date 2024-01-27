import { prisma } from '@ahorita/db';
import { Elysia, t } from 'elysia';

import { TaskDto } from '../models/tasks';

const Params = t.Object({ id: t.String() });

export const tasks = new Elysia().group(
  '/tasks',
  { detail: { tags: ['Tasks'] } },
  (app) =>
    app
      .patch(
        '/:id',
        async ({ params: { id }, body }) => {
          return prisma.task.update({ where: { id }, data: body });
        },
        {
          body: t.Partial(t.Pick(TaskDto, ['name', 'completed'])),
          params: Params,
          response: TaskDto,
        }
      )
      .delete(
        '/:id',
        async ({ params: { id } }) => prisma.task.delete({ where: { id } }),
        {
          params: Params,
          response: TaskDto,
        }
      )
);
