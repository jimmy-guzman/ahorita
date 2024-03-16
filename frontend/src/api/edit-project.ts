import { toast } from "sonner";

import type { API } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { projectsQueryOptions } from "./query-projects";

export const editProjectOptions = mutationOptions({
  mutationFn: async ({
    params,
    body,
  }: Pick<API["projects"][":id"]["patch"], "body" | "params">) => {
    const res = await api.projects(params).patch(body);

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(projectsQueryOptions);
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(projectsQueryOptions);

    toast.success("Project has been edited");
  },
});
