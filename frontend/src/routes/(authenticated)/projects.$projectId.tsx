import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { projectQueryOptions } from "@/api/query-project";
import { queryTasksOptions } from "@/api/query-tasks";
import { ProjectDetails } from "@/components/project-details";
import { ProjectTasksList } from "@/components/project-tasks-list";

export const Route = createFileRoute("/(authenticated)/projects/$projectId")({
  loader: async ({ context: { queryClient }, params }) => {
    void queryClient.prefetchQuery(queryTasksOptions(params));

    await queryClient.ensureQueryData(projectQueryOptions(params.projectId));
  },
  component: Component,
});

function Component() {
  const { projectId } = Route.useParams();
  const { data: tasks } = useSuspenseQuery(queryTasksOptions({ projectId }));

  return (
    <div className="flex flex-col gap-4">
      <ProjectDetails />
      <section className="dsy-card bg-base-200">
        <div className="dsy-card-body">
          <div className="flex items-baseline justify-between gap-2">
            <h2 className="dsy-card-title text-2xl sm:text-3xl">Tasks</h2>
            <span className="text-base-content/60 text-sm">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
            </span>
          </div>

          <ProjectTasksList tasks={tasks} />
        </div>
      </section>
    </div>
  );
}
