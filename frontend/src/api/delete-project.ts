import { toast } from "sonner";

import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { projectsQueryOptions } from "./query-projects";

export const deleteProjectOptions = mutationOptions({
  mutationFn: async (id: string) => {
    const res = await api.groups[id as ":id"].delete();

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(projectsQueryOptions);
  },
  onSuccess: async (_response, id) => {
    queryClient.setQueryData(projectsQueryOptions.queryKey, (oldProjects) => {
      return oldProjects?.filter((oldProject) => oldProject.id !== id);
    });

    toast.success("Project has been deleted");
  },
});