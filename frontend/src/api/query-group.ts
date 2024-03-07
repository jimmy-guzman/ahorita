import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const groupQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ["groups", id] as const,
    queryFn: async () => {
      const res = await api.groups[id as ":id"].get();

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
  });
};
