import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import { projectsQueryOptions } from "@/api/query-projects";
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
    const listItem = {
      ...newProject,
      taskSummary: { total: 0, completed: 0 },
    };

    queryClient.setQueryData(projectsQueryOptions.queryKey, (oldProjects) => {
      return oldProjects ? [...oldProjects, listItem] : [listItem];
    });
  },
});
