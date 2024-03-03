import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { groupQueryOptions } from "./query-group";
import { groupsQueryOptions } from "./query-groups";

export const deleteGroupMutationOptions = mutationOptions({
  mutationFn: async (id: string) => {
    const res = await api.groups[id as ":id"].delete();

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(groupsQueryOptions);
  },
  onSuccess: async (_response, id) => {
    queryClient.removeQueries(groupQueryOptions(id));
    await queryClient.invalidateQueries(groupsQueryOptions);
  },
});
