import { createInsertSchema, createSelectSchema } from "drizzle-typebox";
import { t } from "elysia";

import { projects } from "../schemas/projects";

export const selectProjectSchema = createSelectSchema(projects);

export const insertProjectSchema = createInsertSchema(projects, {
  userId: t.Optional(t.String()),
});
