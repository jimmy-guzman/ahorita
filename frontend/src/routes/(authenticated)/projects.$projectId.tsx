import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { projectQueryOptions } from "@/api/query-project";
import { queryTasksOptions } from "@/api/query-tasks";
import { ProjectDetails } from "@/components/project-details";
import { ProjectTasksList } from "@/components/project-tasks-list";
import { RouteErrorComponent } from "@/components/shared/route-error";

export const Route = createFileRoute("/(authenticated)/projects/$projectId")({
  loader: async ({ context: { queryClient }, params }) => {
    void queryClient.prefetchQuery(queryTasksOptions(params));

    await queryClient.ensureQueryData(projectQueryOptions(params.projectId));
  },
  component: Component,
  errorComponent: RouteErrorComponent,
  pendingComponent: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          <div className="dsy-skeleton h-7 w-48" />
          <div className="dsy-skeleton h-4 w-72" />
        </div>
        <div className="flex gap-1">
          <div className="dsy-skeleton h-8 w-20" />
          <div className="dsy-skeleton h-8 w-8" />
          <div className="dsy-skeleton h-8 w-8" />
        </div>
      </div>
      <div className="dsy-skeleton h-64 w-full" />
    </div>
  ),
});

function Component() {
  const { projectId } = Route.useParams();
  const { data: tasks } = useSuspenseQuery(queryTasksOptions({ projectId }));

  return (
    <div className="flex flex-col gap-6">
      <ProjectDetails />

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline gap-2">
          <h2 className="font-medium text-base-content/60 text-sm uppercase tracking-wider">
            Tasks
          </h2>
          <span className="text-base-content/40 text-sm">{tasks.length}</span>
        </div>
        <ProjectTasksList tasks={tasks} />
      </div>
    </div>
  );
}
