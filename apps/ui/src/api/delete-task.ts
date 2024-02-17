import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { tagsQueryOptions } from "./query-tags";

export const deleteTaskMutationOptions = mutationOptions({
  mutationFn: async (id: string) => {
    const res = await api.tasks[id as ":id"].delete();

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
