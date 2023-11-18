import { prisma, Tag as DbTag } from 'db';
import { Elysia, t } from 'elysia';

const TagDto = t.Object({
  id: t.String(),
  name: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
});

const transformDates = ({ createdAt, updatedAt, ...rest }: DbTag) => ({
  createdAt: createdAt.toISOString(),
  updatedAt: updatedAt.toISOString(),
  ...rest,
});

export const tags = new Elysia()
  .decorate('prisma', prisma)
  .group('/tags', (app) =>
    app.get(
      '',
      async ({ prisma }) => {
        const tasks = await prisma.tag.findMany();

        return tasks.map(transformDates);
      },
      {
        detail: { tags: ['Tags'] },
        response: t.Array(TagDto),
      }
    )
  );
