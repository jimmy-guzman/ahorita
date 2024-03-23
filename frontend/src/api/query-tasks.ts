import { queryOptions } from "@tanstack/react-query";

import { type APIRoutes, api } from "@/api/client";

export const tasksQueryOptions = (
  query: APIRoutes["tasks"]["get"]["query"],
) => {
  return queryOptions({
    queryKey: ["tasks", query] as const,
    queryFn: async () => {
      const res = await api.tasks.get({ query });

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });
};
