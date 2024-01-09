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
  .model({ tags: t.Array(TagDto), tag: TagDto })
  .group('/tags', { detail: { tags: ['Tags'] } }, (app) =>
    app
      .get(
        '',
        async () => {
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
          response: 'tags',
        }
      )
      .post(
        '',
        async ({ body }) => {
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
          body: t.Object({ name: t.String(), description: t.String() }),
          response: 'tag',
        }
      )
  );
