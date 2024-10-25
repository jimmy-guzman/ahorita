import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import type { APIRoutes } from "@/api/client";
import { api } from "@/api/client";
import { mutationOptions } from "@/api/mutation-options";
import queryClient from "@/query-client";

import { queryTasksOptions } from "./query-tasks";

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
  onSuccess: async ({ id, name }) => {
    await queryClient.invalidateQueries(queryTasksOptions());

    toast.success(`Task ${name} has been edited`, {
      action: (
        <Link to="/tasks/$taskId" params={{ taskId: id }} className="dsy-link">
          View Task
        </Link>
      ),
    });
  },
});
