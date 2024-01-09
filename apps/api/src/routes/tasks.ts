import { prisma } from '@ahorita/db';
import { Elysia, NotFoundError, t } from 'elysia';

import { transformDates } from '../utils/transformDates';

const TaskDto = t.Object({
  id: t.String(),
  name: t.String(),
  completed: t.Boolean(),
  tags: t.Array(t.Object({ id: t.String(), name: t.String() })),
  createdAt: t.String(),
  updatedAt: t.String(),
});

export const tasks = new Elysia()
  .model({ tasks: t.Array(TaskDto), task: TaskDto })
  .group('/tasks', { detail: { tags: ['Tasks'] } }, (app) =>
    app
      .get(
        '',
        async () => {
          const tasks = await prisma.task.findMany({
            include: {
              tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          return tasks.map(transformDates);
        },
        {
          response: 'tasks',
        }
      )
      .get(
        '/:id',
        async ({ params: { id } }) => {
          const todo = await prisma.task.findUnique({
            where: { id },
            include: {
              tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          if (!todo) {
            throw new NotFoundError(`tasks not found`);
          }

          return transformDates(todo);
        },
        {
          params: t.Object({ id: t.String() }),
          response: 'task',
        }
      )
      .patch(
        '/:id',
        async ({ params: { id }, body }) => {
          const todo = await prisma.task.update({
            where: { id },
            data: body,
            include: {
              tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          return transformDates(todo);
        },
        {
          body: t.Partial(
            t.Object({
              name: t.String(),
              completed: t.Boolean(),
            })
          ),
          params: t.Object({ id: t.String() }),
          response: 'task',
        }
      )
      .patch(
        '/:id/tags',
        async ({ params: { id }, body }) => {
          const todo = await prisma.task.update({
            where: { id },
            data: {
              tags: {
                set: body,
              },
            },
            include: {
              tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          return transformDates(todo);
        },
        {
          body: t.Array(
            t.Object({
              id: t.String(),
            })
          ),
          params: t.Object({ id: t.String() }),
          response: 'task',
        }
      )
      .post(
        '',
        async ({ body }) => {
          const task = await prisma.task.create({
            data: body,
            include: {
              tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          return transformDates(task);
        },
        {
          body: t.Object({
            name: t.String(),
          }),
          response: 'task',
        }
      )
      .delete(
        '/:id',
        async ({ params: { id } }) => {
          const task = await prisma.task.delete({
            where: { id },
            include: {
              tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });

          return transformDates(task);
        },
        {
          params: t.Object({ id: t.String() }),
          response: 'task',
        }
      )
  );
