import { createFileRoute } from "@tanstack/react-router";

import { projectQueryOptions } from "@/api/query-project";
import { ProjectDetails } from "@/components/project-details";
import { TasksHistory } from "@/components/tasks-history";

function Component() {
  return (
    <div className="flex flex-col gap-4">
      <ProjectDetails />
      <TasksHistory />
    </div>
  );
}

export const Route = createFileRoute("/(authenticated)/projects/$projectId")({
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(projectQueryOptions(params.projectId));
  },
  component: Component,
});
