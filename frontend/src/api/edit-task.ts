import { toast } from "sonner";

import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { tasksQueryOptions } from "./query-tasks";

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
  onSuccess: async ({ projectId, name }) => {
    await queryClient.invalidateQueries(tasksQueryOptions({ projectId }));

    toast.success(`Task ${name} has been edited`);
  },
});
