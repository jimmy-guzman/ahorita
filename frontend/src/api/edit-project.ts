import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";
import { projectQueryOptions } from "./query-project";
import { projectsQueryOptions } from "./query-projects";

export const editProjectOptions = mutationOptions({
  meta: { globalError: true, errorMessage: "Couldn't update project." },
  mutationFn: async ({
    params,
    body,
  }: Pick<APIRoutes["projects"][":projectId"]["patch"], "body" | "params">) => {
    const res = await api.projects(params).patch(body);

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
  onSuccess: (updatedProject) => {
    queryClient.setQueryData(
      projectQueryOptions(updatedProject.id).queryKey,
      updatedProject,
    );
    queryClient.setQueryData(projectsQueryOptions.queryKey, (oldProjects) => {
      return oldProjects?.map((project) =>
        project.id === updatedProject.id
          ? { ...updatedProject, taskSummary: project.taskSummary }
          : project,
      );
    });
  },
});
