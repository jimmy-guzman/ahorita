import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const tagsQueryOptions = queryOptions({
  queryKey: ["tags"] as const,
  queryFn: async () => {
    const res = await api.tags.get();

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
});
