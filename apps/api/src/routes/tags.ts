import { prisma } from '@ahorita/db';
import { Elysia, t } from 'elysia';

import { TagDto } from '../models/tags';
import { TaskDto } from '../models/tasks';

export const tags = new Elysia()
  .model({ tags: t.Array(TagDto), tag: TagDto, tasks: t.Array(TaskDto) })
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
          response: 'tags',
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
          body: t.Object({ name: t.String(), description: t.String() }),
          response: 'tag',
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
          const { tasks } = await prisma.tag.findUniqueOrThrow({
            where: { id },
            include: { tasks: true },
          });

          return tasks;
        },
        {
          params: t.Object({ id: t.String() }),
          response: 'tasks',
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
          body: t.Object({
            name: t.String(),
          }),
          response: TaskDto,
        }
      )
  );
