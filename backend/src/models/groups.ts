import { t } from "elysia";

export const GroupDto = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  icon: t.Union([t.String(), t.Null()]),
  isFavorite: t.Boolean(),
  createdAt: t.String(),
  updatedAt: t.String(),
  userId: t.String(),
});
