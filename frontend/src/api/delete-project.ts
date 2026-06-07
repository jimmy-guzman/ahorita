import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";
import { projectsQueryOptions } from "./query-projects";
import { projectStatsQueryOptions } from "./query-projects-stats";

export const deleteProjectOptions = mutationOptions({
  meta: { globalError: true, errorMessage: "Couldn't delete project." },
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
  onSuccess: ({ id }) => {
    queryClient.setQueryData(projectsQueryOptions.queryKey, (oldProjects) => {
      return oldProjects?.filter((oldProject) => oldProject.id !== id);
    });

    queryClient.setQueryData(projectStatsQueryOptions.queryKey, (oldStats) => {
      return oldStats?.filter((oldStat) => oldStat.id !== id);
    });
  },
});
