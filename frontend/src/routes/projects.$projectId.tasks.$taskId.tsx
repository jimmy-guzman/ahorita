import { createFileRoute } from "@tanstack/react-router";

import { queryTaskOptions } from "@/api/query-task";
import { TaskDetails } from "@/components/task-details";

export const Route = createFileRoute("/projects/$projectId/tasks/$taskId")({
  component: TaskDetails,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(queryTaskOptions(params));
  },
});
