import { prisma, Tag as DbTag } from 'db';
import { Elysia, t } from 'elysia';

const TagDto = t.Object({
  id: t.String(),
  name: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
  _count: t.Object({
    tasks: t.Number(),
  }),
});

const transformDates = ({
  createdAt,
  updatedAt,
  ...rest
}: DbTag & {
  _count: {
    tasks: number;
  };
}) => ({
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
  );
