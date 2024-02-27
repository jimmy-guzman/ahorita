import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { tagQueryOptions } from "./query-tag";

export const addTaskByTagIdMutationOptions = mutationOptions({
  mutationFn: async ({
    params,
    body,
  }: Pick<API["/tags/:id/tasks"]["post"], "body" | "params">) => {
    const res = await api.tags[params.id as ":id"].tasks.post(body);

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async ({ params: { id } }) => {
    await queryClient.cancelQueries(tagQueryOptions(id));
  },
  onSuccess: async (_response, { params: { id } }) => {
    await queryClient.invalidateQueries(tagQueryOptions(id));
  },
});