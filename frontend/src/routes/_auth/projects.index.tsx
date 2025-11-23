import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { projectsQueryOptions } from "@/api/query-projects";
import { CreateProject } from "@/components/create-project";

import { ProjectsList } from "@/components/projects-list";

function Projects() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="flex flex-col gap-4 md:container md:mx-auto md:px-8">
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

export const Route = createFileRoute("/_auth/projects/")({
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(projectsQueryOptions);
  },
  component: Projects,
});
