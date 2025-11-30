import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";

import { queryTasksOptions } from "./query-tasks";

export const deleteTaskMutationOptions = mutationOptions({
  mutationFn: async (taskId: string) => {
    const res = await api.tasks({ taskId }).delete();

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(queryTasksOptions());
  },
});
