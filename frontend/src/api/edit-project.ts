import { toast } from "sonner";

import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { groupsQueryOptions } from "./query-projects";

export const editGroupOptions = mutationOptions({
  mutationFn: async ({
    params,
    body,
  }: Pick<API["/groups/:id"]["patch"], "body" | "params">) => {
    const res = await api.groups[params.id as ":id"].patch(body);

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(groupsQueryOptions);
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(groupsQueryOptions);

    toast.success("Project has been edited");
  },
});
