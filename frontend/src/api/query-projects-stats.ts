import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const projectStatsQueryOptions = queryOptions({
  queryKey: ["projects", "stats"] as const,
  queryFn: async () => {
    const res = await api.projects.stats.get();

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
});
