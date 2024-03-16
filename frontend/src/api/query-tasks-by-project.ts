import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const tasksByGroupQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["groups", id, "tasks"] as const,
    queryFn: async () => {
      const res = await api.groups[id as ":id"].tasks.get();

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
  });
};
