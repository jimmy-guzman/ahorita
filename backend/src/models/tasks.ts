import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

import { tasks } from "../schemas/projects";
import { selectProjectSchema } from "./projects";

export const selectTaskSchema = createSelectSchema(tasks);

export const insertTaskSchema = createInsertSchema(tasks, {
  userId: t.Optional(t.String()),
});

export const selectTaskWithProjectSchema = t.Intersect([
  t.Omit(selectTaskSchema, ["projectId", "userId"]),
  t.Object({ project: t.Omit(selectProjectSchema, ["userId"]) }),
]);
