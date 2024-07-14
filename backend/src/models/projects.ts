import { createSelectSchema } from "drizzle-typebox";

import { projects } from "../schemas/projects";

export const selectProjectSchema = createSelectSchema(projects);
