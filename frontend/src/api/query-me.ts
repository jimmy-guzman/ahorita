import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const meQueryOptions = queryOptions({
  queryKey: ["users", "me"] as const,
  queryFn: async () => {
    const res = await api.users.me.get();

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
});
