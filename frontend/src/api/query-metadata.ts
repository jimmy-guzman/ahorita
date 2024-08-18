import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const queryMetadataOptions = () => {
  return queryOptions({
    queryKey: ["metadata"] as const,
    queryFn: async () => {
      const res = await api.metadata.get();

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });
};
