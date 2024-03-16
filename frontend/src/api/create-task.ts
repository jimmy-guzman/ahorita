import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { tasksByProjectQueryOptions } from "./query-tasks-by-project";

export const createTaskByProjectIdOptions = mutationOptions({
  mutationFn: async ({
    params,
    body,
  }: Pick<API["/projects/:id/tasks"]["post"], "body" | "params">) => {
    const res = await api.projects[params.id as ":id"].tasks.post(body);

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async ({ params: { id } }) => {
    await queryClient.cancelQueries(tasksByProjectQueryOptions(id));
  },
  onSuccess: async (_response, { params: { id } }) => {
    await queryClient.invalidateQueries(tasksByProjectQueryOptions(id));
  },
});
