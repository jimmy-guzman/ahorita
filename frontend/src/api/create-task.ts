import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";

import { queryTasksOptions } from "./query-tasks";

export const createTask = mutationOptions({
  mutationFn: async (body: APIRoutes["tasks"]["post"]["body"]) => {
    const res = await api.tasks.post(body);

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(queryTasksOptions());
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(queryTasksOptions());
  },
});
