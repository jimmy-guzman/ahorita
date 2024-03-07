import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const groupsQueryOptions = queryOptions({
  queryKey: ["groups"] as const,
  queryFn: async () => {
    const res = await api.groups.get();

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
});
