import { toast } from "sonner";

import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { groupsQueryOptions } from "./query-groups";

export const deleteGroupOptions = mutationOptions({
  mutationFn: async (id: string) => {
    const res = await api.groups[id as ":id"].delete();

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(groupsQueryOptions);
  },
  onSuccess: async (_response, id) => {
    queryClient.setQueryData(groupsQueryOptions.queryKey, (oldGroups) => {
      return oldGroups?.filter((oldGroup) => oldGroup.id !== id);
    });

    toast.success("Project has been deleted");
  },
});
