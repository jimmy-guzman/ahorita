import { t } from "elysia";

export const ProjectSchema = t.Object({
  id: t.String(),
  name: t.String(),
  description: t.String(),
  icon: t.Nullable(t.String()),
  isFavorite: t.Boolean(),
  createdAt: t.String(),
  updatedAt: t.String(),
  userId: t.String(),
});
