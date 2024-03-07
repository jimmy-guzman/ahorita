import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const meQueryOptions = queryOptions({
  queryKey: ["users", "me"] as const,
  queryFn: async () => api.users.me.get(),
});
