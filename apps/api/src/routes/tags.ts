import { prisma } from '@ahorita/db';
import { Elysia, t } from 'elysia';

import { transformDates } from '../utils/transformDates';

const TagDto = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
  _count: t.Object({
    tasks: t.Number(),
  }),
});

export const tags = new Elysia()
  .decorate('prisma', prisma)
  .group('/tags', (app) =>
    app
      .get(
        '',
        async ({ prisma }) => {
          const tags = await prisma.tag.findMany({
            include: {
              _count: {
                select: { tasks: true },
              },
            },
          });

          return tags.map(transformDates);
        },
        {
          detail: { tags: ['Tags'] },
          response: t.Array(TagDto),
        }
      )
      .post(
        '',
        async ({ prisma, body }) => {
          const tag = await prisma.tag.create({
            data: body,
            include: {
              _count: {
                select: { tasks: true },
              },
            },
          });

          return transformDates(tag);
        },
        {
          detail: { tags: ['Tags'] },
          body: t.Object({ name: t.String(), description: t.String() }),
          response: TagDto,
        }
      )
  );
