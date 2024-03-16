import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { projectsQueryOptions } from "@/api/query-projects";
import { queryClient } from "@/query-client";

export const createProjectOptions = mutationOptions({
  mutationFn: async (body: API["/groups"]["post"]["body"]) => {
    const res = await api.groups.post(body);

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(projectsQueryOptions);
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(projectsQueryOptions);
  },
});