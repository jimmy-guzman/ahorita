import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { tasksByGroupQueryOptions } from "./query-tasks-by-group";

export const createTaskByGroupIdOptions = mutationOptions({
  mutationFn: async ({
    params,
    body,
  }: Pick<API["/groups/:id/tasks"]["post"], "body" | "params">) => {
    const res = await api.groups[params.id as ":id"].tasks.post(body);

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async ({ params: { id } }) => {
    await queryClient.cancelQueries(tasksByGroupQueryOptions(id));
  },
  onSuccess: async (_response, { params: { id } }) => {
    await queryClient.invalidateQueries(tasksByGroupQueryOptions(id));
  },
});
