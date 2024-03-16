import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const projectQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["projects", id] as const,
    queryFn: async () => {
      const res = await api.projects[id as ":id"].get();

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
  });
};
