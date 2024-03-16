import { toast } from "sonner";

import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { queryClient } from "@/query-client";

import { projectsQueryOptions } from "./query-projects";

export const deleteProjectOptions = mutationOptions({
  mutationFn: async (projectId: string) => {
    const res = await api.projects({ projectId }).delete();

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(projectsQueryOptions);
  },
  onSuccess: async (_response, projectId) => {
    queryClient.setQueryData(projectsQueryOptions.queryKey, (oldProjects) => {
      return oldProjects?.filter((oldProject) => oldProject.id !== projectId);
    });

    toast.success("Project has been deleted");
  },
});
