import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";

import { tasksQueryOptions } from "./query-tasks";

export const editTaskMutationOptions = mutationOptions({
  mutationFn: async ({
    params,
    body,
  }: Pick<APIRoutes["tasks"][":taskId"]["patch"], "body" | "params">) => {
    const res = await api.tasks(params).patch(body);

    if (res.error) {
      throw res.error;
    }

    return res.data;
  },
  onSuccess: async ({ id, projectId, name }) => {
    await queryClient.invalidateQueries(tasksQueryOptions({ projectId }));

    toast.success(`Task ${name} has been edited`, {
      action: (
        <Link
          to="/projects/$projectId/tasks/$taskId"
          params={{ taskId: id, projectId }}
          className="dsy-link"
        >
          View Task
        </Link>
      ),
    });
  },
});
