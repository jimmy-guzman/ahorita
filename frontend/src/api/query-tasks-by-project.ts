import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const tasksByProjectQueryOptions = (projectId: string) => {
  return queryOptions({
    queryKey: ["projects", projectId, "tasks"] as const,
    queryFn: async () => {
      const res = await api.projects({ projectId }).tasks.get();

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });
};
