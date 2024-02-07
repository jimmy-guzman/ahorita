import { t } from 'elysia';

export const TaskDto = t.Object({
  id: t.String(),
  name: t.String(),
  completed: t.Boolean(),
  createdAt: t.String(),
  updatedAt: t.String(),
  tagId: t.String(),
});
