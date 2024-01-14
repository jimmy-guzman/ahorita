import { prisma } from '@ahorita/db';
import { Elysia, NotFoundError, t } from 'elysia';

import { TaskDto } from '../models/tasks';

const Params = t.Object({ id: t.String() });

export const tasks = new Elysia()
  .model({ tasks: t.Array(TaskDto), task: TaskDto })
  // eslint-disable-next-line max-lines-per-function
  .group('/tasks', { detail: { tags: ['Tasks'] } }, (app) =>
    app
      .get('', async () => prisma.task.findMany(), { response: 'tasks' })
      .get(
        '/:id',
        async ({ params: { id } }) => {
          const todo = await prisma.task.findUnique({ where: { id } });

          if (!todo) {
            throw new NotFoundError(`tasks not found`);
          }

          return todo;
        },
        {
          params: Params,
          response: 'task',
        }
      )
      .patch(
        '/:id',
        async ({ params: { id }, body }) => {
          return prisma.task.update({ where: { id }, data: body });
        },
        {
          body: t.Partial(
            t.Object({
              name: t.String(),
              completed: t.Boolean(),
            })
          ),
          params: Params,
          response: 'task',
        }
      )
      .patch(
        '/:id/tags',
        async ({ params: { id }, body }) => {
          return prisma.task.update({
            where: { id },
            data: {
              tags: {
                set: body,
              },
            },
          });
        },
        {
          body: t.Array(
            t.Object({
              id: t.String(),
            })
          ),
          params: Params,
          response: 'task',
        }
      )
      .post('', async ({ body }) => prisma.task.create({ data: body }), {
        body: t.Object({
          name: t.String(),
        }),
        response: 'task',
      })
      .delete(
        '/:id',
        async ({ params: { id } }) => prisma.task.delete({ where: { id } }),
        {
          params: Params,
          response: 'task',
        }
      )
  );
