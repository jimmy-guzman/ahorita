import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { tagsQueryOptions } from "@/api/query-tags";
import { queryClient } from "@/query-client";

export const addTagMutationOptions = mutationOptions({
  mutationFn: async (body: API["/tags"]["post"]["body"]) => {
    const res = await api.tags.post(body);

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(tagsQueryOptions);
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(tagsQueryOptions);
  },
});
