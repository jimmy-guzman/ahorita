import { prisma } from '@ahorita/db';
import { Elysia, NotFoundError, t } from 'elysia';

import { DateTime } from '../types';

const TaskDto = t.Object({
  id: t.String(),
  name: t.String(),
  completed: t.Boolean(),
  tags: t.Array(t.Object({ id: t.String(), name: t.String() })),
  createdAt: DateTime,
  updatedAt: DateTime,
});

export const tasks = new Elysia()
  .model({ tasks: t.Array(TaskDto), task: TaskDto })
  .group('/tasks', { detail: { tags: ['Tasks'] } }, (app) =>
    app
      .get(
        '',
        async () => {
          return prisma.task.findMany({
            include: {
              tags: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          });
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

          return todo;
        },
        {
          params: t.Object({ id: t.String() }),
          response: 'task',
        }
      )
      .patch(
        '/:id',
        async ({ params: { id }, body }) => {
          return prisma.task.update({
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
          return prisma.task.update({
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
          return prisma.task.create({
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
          return prisma.task.delete({
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
        },
        {
          params: t.Object({ id: t.String() }),
          response: 'task',
        }
      )
  );
