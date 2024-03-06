import { t } from "elysia";

export const LabelDto = t.Object({
  id: t.String(),
  name: t.String(),
  createdAt: t.String(),
  updatedAt: t.String(),
  userId: t.String(),
});
