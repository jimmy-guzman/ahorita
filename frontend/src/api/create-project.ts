import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { projectsQueryOptions } from "@/api/query-projects";
import { projectStatsQueryOptions } from "@/api/query-projects-stats";
import queryClient from "@/query-client";

export const createProjectOptions = mutationOptions({
  mutationFn: async (body: APIRoutes["projects"]["post"]["body"]) => {
    const res = await api.projects.post(body);

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(projectsQueryOptions);
  },
  onSuccess: (newProject) => {
    queryClient.setQueryData(projectsQueryOptions.queryKey, (oldProjects) => {
      return oldProjects ? [...oldProjects, newProject] : [newProject];
    });

    const statsItem = {
      id: newProject.id,
      name: newProject.name,
      Backlog: 0,
      Todo: 0,
      "In Progress": 0,
      Done: 0,
      Canceled: 0,
    };

    queryClient.setQueryData(projectStatsQueryOptions.queryKey, (oldStats) => {
      return oldStats ? [...oldStats, statsItem] : [statsItem];
    });
  },
});
