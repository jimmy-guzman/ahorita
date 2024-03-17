import { t } from "elysia";

export const TaskDto = t.Object({
  id: t.String(),
  name: t.String(),
  status: t.Union([
    t.Literal("Backlog"),
    t.Literal("Todo"),
    t.Literal("In Progress"),
    t.Literal("Done"),
    t.Literal("Canceled"),
  ]),
  priority: t.Union([t.Literal("Low"), t.Literal("Medium"), t.Literal("High")]),
  label: t.Union([
    t.Literal("Feature"),
    t.Literal("Bug"),
    t.Literal("Documentation"),
  ]),
  createdAt: t.String(),
  updatedAt: t.String(),
  dueAt: t.String(),
  projectId: t.String(),
  userId: t.String(),
});
