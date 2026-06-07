import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";

import { projectStatsQueryOptions } from "./query-projects-stats";
import { queryTasksOptions } from "./query-tasks";

export const editTaskMutationOptions = mutationOptions({
  meta: { globalError: true, errorMessage: "Couldn't update task." },
  mutationFn: async ({
    params,
    body,
  }: Pick<APIRoutes["tasks"][":taskId"]["patch"], "body" | "params">) => {
    const res = await api.tasks(params).patch(body);

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
