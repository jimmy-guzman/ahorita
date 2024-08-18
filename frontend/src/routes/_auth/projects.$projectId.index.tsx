import { createFileRoute } from "@tanstack/react-router";

import { queryTasksOptions } from "@/api/query-tasks";
import { TasksHistory } from "@/components/tasks-history";

export const Route = createFileRoute("/_auth/projects/$projectId/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(queryTasksOptions(params));
  },
  component: TasksHistory,
});
