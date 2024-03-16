import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const projectsQueryOptions = queryOptions({
  queryKey: ["projects"] as const,
  queryFn: async () => {
    const res = await api.projects.get();

    if (res.error) {
      throw new Error(res.error.value);
    }

    return res.data;
  },
});
