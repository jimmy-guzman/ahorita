import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { projectsQueryOptions } from "@/api/query-projects";
import { CreateProject } from "@/components/create-project";

import { ProjectsList } from "@/components/projects-list";

function Projects() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="prose dsy-prose">
          <h2>Projects</h2>
        </div>
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
  pendingComponent: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="dsy-skeleton h-8 w-28"></div>
        <div className="dsy-skeleton h-8 w-36"></div>
      </div>

      <div className="dsy-skeleton dsy-skeleton-text h-8 w-full max-w-xs"></div>

      <ul className="dsy-list rounded-box bg-base-200">
        {Array.from({ length: 3 }).map((_, i) => (
          <li
            // biome-ignore lint/suspicious/noArrayIndexKey: this is a static array for skeletons
            key={i}
            className="dsy-list-row flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center"
          >
            <div className="flex flex-1 flex-col gap-2">
              <div className="dsy-skeleton h-5 w-48"></div>
              <div className="dsy-skeleton h-4 w-full max-w-md"></div>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <div className="dsy-skeleton h-8 w-8"></div>
              <div className="dsy-skeleton h-8 w-8"></div>
              <div className="dsy-skeleton h-8 w-8"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ),
});
