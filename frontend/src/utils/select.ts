import { compareAsc } from "date-fns";

import type { APIRoutes } from "@/api/client";

export const getTasksByCreatedAt = (
  tasks: APIRoutes["tasks"]["get"]["response"]["200"],
) => {
  return tasks.sort((a, b) => compareAsc(a.createdAt, b.createdAt));
};
