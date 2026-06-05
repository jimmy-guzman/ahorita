import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { projectsQueryOptions } from "@/api/query-projects";
import { CreateProject } from "@/components/create-project";
import { ProjectsList } from "@/components/projects-list";
import { RouteErrorComponent } from "@/components/shared/route-error";

function Projects() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-base-content text-xl">Projects</h1>
        <CreateProject />
      </div>
      <ProjectsList projects={projects} />
    </div>
  );
}

export const Route = createFileRoute("/(authenticated)/projects/")({
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData(projectsQueryOptions);
  },
  component: Projects,
  errorComponent: RouteErrorComponent,
  pendingComponent: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="dsy-skeleton h-7 w-24" />
        <div className="dsy-skeleton h-8 w-32" />
      </div>
      <div className="dsy-skeleton h-9 w-56" />
      <div className="divide-y divide-base-300 rounded-box border border-base-300">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton array
            key={i}
            className="flex items-center gap-3 px-4 py-3"
          >
            <div className="flex flex-1 flex-col gap-1.5">
              <div className="dsy-skeleton h-4 w-40" />
              <div className="dsy-skeleton h-3 w-64" />
            </div>
            <div className="flex gap-1">
              <div className="dsy-skeleton h-6 w-6" />
              <div className="dsy-skeleton h-6 w-6" />
              <div className="dsy-skeleton h-6 w-6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});
