import { t } from "elysia";

export const GroupDto = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  isFavorite: t.Boolean(),
  createdAt: t.String(),
  updatedAt: t.String(),
  userId: t.String(),
});
