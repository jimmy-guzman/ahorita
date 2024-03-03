import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { groupsQueryOptions } from "./query-groups";

export const editTaskMutationOptions = mutationOptions({
  mutationFn: async ({
    params,
    body,
  }: Pick<API["/tasks/:id"]["patch"], "body" | "params">) => {
    const res = await api.tasks[params.id as ":id"].patch(body);

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(groupsQueryOptions);
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(groupsQueryOptions);
  },
});
