import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";
import { projectQueryOptions } from "./query-project";

export const editProjectOptions = mutationOptions({
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
  onMutate: async ({ params }) => {
    await queryClient.invalidateQueries(projectQueryOptions(params.projectId));
  },
});
