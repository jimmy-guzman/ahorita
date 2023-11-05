import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { prisma, Tag, Task as DbTask } from 'db';
import { Elysia, NotFoundError, Static, t } from 'elysia';

const TaskDto = t.Object({
  id: t.String(),
  name: t.String(),
  completed: t.Boolean(),
  tags: t.Array(t.Object({ name: t.String() })),
  createdAt: t.String(),
  updatedAt: t.String(),
});

const transformDates = ({
  createdAt,
  updatedAt,
  ...rest
}: DbTask & { tags: Pick<Tag, 'name'>[] }) => ({
  createdAt: createdAt.toISOString(),
  updatedAt: updatedAt.toISOString(),
  ...rest,
});

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: { title: 'Ahorita API Docs', version: '', description: '' },
      },
      exclude: ['/'],
    })
  )
  .decorate('prisma', prisma)
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = error.status;

      return { status: error.status, code, message: error.message };
    }
  })
  .group('/tasks', (app) =>
    app
      .get(
        '',
        async ({ prisma }) => {
          const tasks = await prisma.task.findMany({
            include: {
              tags: {
                select: {
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
                  name: true,
                },
              },
            },
          });

          if (!todo) {
            throw new NotFoundError(`todo not found`);
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
                  name: true,
                },
              },
            },
          });

          if (!todo) {
            throw new NotFoundError(`todo not found`);
          }

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
      .post(
        '',
        async ({ body, prisma }) => {
          const task = await prisma.task.create({
            data: body,
            include: {
              tags: {
                select: {
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
  )
  .listen(3000, ({ hostname, port }) => {
    console.log(`🚀 Running at http://${hostname}:${port}/swagger`);
  });

export type Task = Static<typeof TaskDto>;
export type App = typeof app;
