import { t } from 'elysia';

export const TagDto = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
  _count: t.Object({
    tasks: t.Number(),
  }),
});
