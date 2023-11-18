import { prisma } from 'db';
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
  .decorate('prisma', prisma)
  .group('/tasks', (app) =>
    app
      .get(
        '',
        async ({ prisma }) => {
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
          detail: { tags: ['Tasks'] },
          response: t.Array(TaskDto),
        }
      )
      .get(
        '/:id',
        async ({ params: { id }, prisma }) => {
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
          detail: { tags: ['Tasks'] },
          params: t.Object({ id: t.String() }),
          response: TaskDto,
        }
      )
      .patch(
        '/:id',
        async ({ params: { id }, body, prisma }) => {
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
          detail: { tags: ['Tasks'] },
          body: t.Partial(
            t.Object({
              name: t.String(),
              completed: t.Boolean(),
            })
          ),
          params: t.Object({ id: t.String() }),
          response: TaskDto,
        }
      )
      .patch(
        '/:id/tags',
        async ({ params: { id }, body, prisma }) => {
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
          detail: { tags: ['Tasks'] },
          body: t.Array(
            t.Object({
              id: t.String(),
            })
          ),
          params: t.Object({ id: t.String() }),
          response: TaskDto,
        }
      )
      .post(
        '',
        async ({ body, prisma }) => {
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
          detail: { tags: ['Tasks'] },
          body: t.Object({
            name: t.String(),
          }),
          response: TaskDto,
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
          detail: { tags: ['Tasks'] },
          params: t.Object({ id: t.String() }),
          response: TaskDto,
        }
      )
  );
