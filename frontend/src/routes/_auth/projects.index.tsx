import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { projectsQueryOptions } from "@/api/query-projects";
import { CreateProject } from "@/components/create-project";
import { columns } from "@/components/projects-table/columns";
import { Table } from "@/components/shared/table";

function Projects() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="flex flex-col gap-4 md:container md:mx-auto md:px-8">
      <div className="flex justify-between">
        <div className="prose dsy-prose">
          <h2>Projects</h2>
        </div>
        <CreateProject />
      </div>
      <Table
        data={projects}
        columns={columns}
        enableGlobalFiltering
        globalFilterPlaceholder="Filter Projects..."
      />
    </div>
  );
}

export const Route = createFileRoute("/_auth/projects/")({
  loader: async ({ context }) => {
    // TODO: remove context null check when issue of being undefined is addressed
    if (context) {
      await context.queryClient.ensureQueryData(projectsQueryOptions);
    }
  },
  component: Projects,
});
