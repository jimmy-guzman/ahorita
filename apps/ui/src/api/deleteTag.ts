import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutationOptions";
import { queryClient } from "@/queryClient";

import { tagQueryOptions } from "./queryTag";
import { tagsQueryOptions } from "./queryTags";

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
