import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

import { tasks } from "../schemas/projects";

export const selectTaskSchema = createSelectSchema(tasks);

export const insertTaskSchema = createInsertSchema(tasks, {
  userId: t.Optional(t.String()),
});
