import { compareAsc } from "date-fns";

import type { APITypes } from "@/api/client";

export const sortTasksByCreatedAt = (tasks: APITypes["Task"][]) => {
  return tasks.sort((a, b) => compareAsc(a.createdAt, b.createdAt));
};
