import { t } from 'elysia';

import { DateTime } from '../types';

export const TaskDto = t.Object({
  id: t.String(),
  name: t.String(),
  completed: t.Boolean(),
  tags: t.Array(t.Object({ id: t.String(), name: t.String() })),
  createdAt: DateTime,
  updatedAt: DateTime,
});
