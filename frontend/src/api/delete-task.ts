import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";

import { projectStatsQueryOptions } from "./query-projects-stats";
import { queryTasksOptions } from "./query-tasks";

export const deleteTaskMutationOptions = mutationOptions({
  meta: { globalError: true, errorMessage: "Couldn't delete task." },
  mutationFn: async (taskId: string) => {
    const res = await api.tasks({ taskId }).delete();

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
  onSuccess: async () => {
    await Promise.all([
      queryClient.invalidateQueries(queryTasksOptions()),
      queryClient.invalidateQueries(projectStatsQueryOptions),
    ]);
  },
});
