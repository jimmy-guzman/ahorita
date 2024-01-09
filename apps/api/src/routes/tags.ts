import { prisma } from '@ahorita/db';
import { Elysia, t } from 'elysia';

import { DateTime } from '../types';

const TagDto = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  createdAt: DateTime,
  updatedAt: DateTime,
  _count: t.Object({
    tasks: t.Number(),
  }),
});

export const tags = new Elysia()
  .model({ tags: t.Array(TagDto), tag: TagDto })
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
  );
