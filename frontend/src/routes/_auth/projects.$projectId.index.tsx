import { createFileRoute } from "@tanstack/react-router";

import { tasksQueryOptions } from "@/api/query-tasks";
import { TasksTimeline } from "@/components/tasks-timeline";

export const Route = createFileRoute("/_auth/projects/$projectId/")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tasksQueryOptions(params));
  },
  component: TasksTimeline,
});
