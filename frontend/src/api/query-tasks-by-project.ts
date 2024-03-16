import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const tasksByProjectQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["projects", id, "tasks"] as const,
    queryFn: async () => {
      const res = await api.projects[id as ":id"].tasks.get();

      if (res.error) {
        throw new Error(res.error.value);
      }

      return res.data;
    },
  });
};
