import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

import { projectsQueryOptions } from "@/api/query-projects";
import { CreateProject } from "@/components/create-project";
import { columns } from "@/components/projects-table/columns";
import { RouteErrorComponent } from "@/components/shared/route-error";
import { Table } from "@/components/shared/table";

function Projects() {
  const { data: projects } = useSuspenseQuery(projectsQueryOptions);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-base-content text-xl">Projects</h1>
        <CreateProject />
      </div>
      <Table data={projects} columns={columns} />
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
      <div className="overflow-x-auto">
        <table className="dsy-table dsy-table-pin-rows md:dsy-table-md dsy-table-xs">
          <thead>
            <tr>
              {[
                "Name",
                "Description",
                "Status",
                "Progress",
                "Favorite",
                "Updated",
                "",
              ].map((col) => (
                <th
                  key={col}
                  className="text-base-content/50 text-xs uppercase tracking-wider"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-base-300">
            {Array.from({ length: 5 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
              <tr key={i}>
                <td>
                  <div className="dsy-skeleton h-4 w-40" />
                </td>
                <td>
                  <div className="dsy-skeleton h-4 w-64" />
                </td>
                <td>
                  <div className="dsy-skeleton h-4 w-16" />
                </td>
                <td>
                  <div className="dsy-skeleton h-4 w-20" />
                </td>
                <td>
                  <div className="dsy-skeleton h-4 w-10" />
                </td>
                <td>
                  <div className="dsy-skeleton h-4 w-12" />
                </td>
                <td>
                  <div className="dsy-skeleton h-6 w-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ),
});
