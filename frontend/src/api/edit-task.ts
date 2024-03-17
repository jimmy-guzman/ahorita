import { toast } from "sonner";

import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { tasksByProjectQueryOptions } from "./query-tasks-by-project";

export const editTaskMutationOptions = mutationOptions({
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
  onSuccess: async ({ projectId }) => {
    await queryClient.invalidateQueries(tasksByProjectQueryOptions(projectId));

    toast.success("Task has been edited");
  },
});
