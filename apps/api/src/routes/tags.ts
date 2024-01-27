import { prisma } from '@ahorita/db';
import { Elysia, t } from 'elysia';

import { TagDto } from '../models/tags';
import { TaskDto } from '../models/tasks';

export const tags = new Elysia()
  // eslint-disable-next-line max-lines-per-function
  .group('/tags', { detail: { tags: ['Tags'] } }, (app) =>
    app
      .get(
        '',
        async () => {
          return prisma.tag.findMany({
            include: {
              _count: {
                select: { tasks: true },
              },
            },
          });
        },
        {
          response: t.Array(TagDto),
        }
      )
      .post(
        '',
        async ({ body }) => {
          return prisma.tag.create({
            data: body,
            include: {
              _count: {
                select: { tasks: true },
              },
            },
          });
        },
        {
          body: t.Pick(TagDto, ['name', 'description']),
          response: TagDto,
        }
      )
      .get(
        '/:id',
        async ({ params: { id } }) =>
          prisma.tag.findUniqueOrThrow({
            where: { id },
            include: {
              _count: {
                select: { tasks: true },
              },
            },
          }),
        {
          params: t.Object({ id: t.String() }),
          response: TagDto,
        }
      )
      .delete(
        '/:id',
        async ({ params: { id } }) =>
          prisma.tag.delete({
            where: { id },
            include: {
              _count: {
                select: { tasks: true },
              },
            },
          }),
        {
          params: t.Object({ id: t.String() }),
          response: TagDto,
        }
      )
      .get(
        '/:id/tasks',
        async ({ params: { id } }) => {
          return prisma.task.findMany({
            where: { tags: { some: { id } } },
          });
        },
        {
          params: t.Object({ id: t.String() }),
          response: t.Array(TaskDto),
        }
      )
      .post(
        '/:id/tasks',
        async ({ params: { id }, body }) => {
          return prisma.task.create({
            data: {
              ...body,
              tags: { connect: { id } },
            },
          });
        },
        {
          params: t.Object({ id: t.String() }),
          body: t.Pick(TaskDto, ['name']),
          response: TaskDto,
        }
      )
  );
