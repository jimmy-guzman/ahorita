import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const projectQueryOptions = (projectId: string) => {
  return queryOptions({
    queryKey: ["projects", projectId] as const,
    queryFn: async () => {
      const res = await api.projects({ projectId }).get();

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });
};
