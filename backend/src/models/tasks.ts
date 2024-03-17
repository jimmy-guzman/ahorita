import { t } from "elysia";

const StatusSchema = t.Union([
  t.Literal("Backlog"),
  t.Literal("Todo"),
  t.Literal("In Progress"),
  t.Literal("Done"),
  t.Literal("Canceled"),
]);

const PrioritySchema = t.Union([
  t.Literal("Low"),
  t.Literal("Medium"),
  t.Literal("High"),
]);

const LabelSchema = t.Union([
  t.Literal("Feature"),
  t.Literal("Bug"),
  t.Literal("Documentation"),
]);

export const TaskSchema = t.Object({
  id: t.String(),
  name: t.String(),
  status: StatusSchema,
  priority: PrioritySchema,
  label: LabelSchema,
  createdAt: t.String(),
  updatedAt: t.String(),
  dueAt: t.String(),
  projectId: t.String(),
  userId: t.String(),
});
