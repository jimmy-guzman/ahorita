import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const projectsTotalsQueryOptions = queryOptions({
  queryKey: ["projects", "totals"] as const,
  queryFn: async () => {
    const res = await api.projects.totals.get();

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
});
