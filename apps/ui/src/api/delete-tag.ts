import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { tagQueryOptions } from "./query-tag";
import { tagsQueryOptions } from "./query-tags";

export const deleteTagMutationOptions = mutationOptions({
  mutationFn: async (id: string) => {
    const res = await api.tags[id as ":id"].delete();

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(tagsQueryOptions);
  },
  onSuccess: async (_response, id) => {
    queryClient.removeQueries(tagQueryOptions(id));
    await queryClient.invalidateQueries(tagsQueryOptions);
  },
});
