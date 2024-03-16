import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const projectQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["projects", id] as const,
    queryFn: async () => {
      const res = await api.projects({ id }).get();

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });
};
