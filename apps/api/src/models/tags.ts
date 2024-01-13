import { t } from 'elysia';

import { DateTime } from '../types';

export const TagDto = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  createdAt: DateTime,
  updatedAt: DateTime,
  _count: t.Object({
    tasks: t.Number(),
  }),
});
