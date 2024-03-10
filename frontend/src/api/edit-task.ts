import { toast } from "sonner";

import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { tasksByGroupQueryOptions } from "./query-tasks-by-group";

export const editTaskMutationOptions = mutationOptions({
  mutationFn: async ({
    params,
    body,
  }: Pick<API["/tasks/:id"]["patch"], "body" | "params">) => {
    const res = await api.tasks[params.id as ":id"].patch(body);

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onSuccess: async ({ groupId }) => {
    await queryClient.invalidateQueries(tasksByGroupQueryOptions(groupId));

    toast.success("Task has been edited");
  },
});
