import { queryOptions } from "@tanstack/react-query";

import { api } from "@/api/client";

export const queryTaskOptions = ({ taskId }: { taskId: string }) => {
  return queryOptions({
    queryKey: ["tasks", taskId] as const,
    queryFn: async () => {
      const res = await api.tasks({ taskId }).get();

      if (res.error) {
        throw res.error;
      }

      return res.data;
    },
  });
};
