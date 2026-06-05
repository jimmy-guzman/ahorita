import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import * as v from "valibot";

import { queryTasksOptions } from "@/api/query-tasks";
import { CreateTask } from "@/components/create-task";
import { RouteErrorComponent } from "@/components/shared/route-error";
import { Table } from "@/components/shared/table";
import { columns } from "@/components/tasks-table/columns";

// TODO: find a better way to share static metadata between backend and frontend
const statuses = [
  "Backlog",
  "Todo",
  "In Progress",
  "Done",
  "Canceled",
] as const;

const tasksSearchSchema = v.object({
  projectId: v.optional(v.string()),
  status: v.optional(v.union(statuses.map((status) => v.literal(status)))),
});

const routeApi = getRouteApi("/(authenticated)/tasks/");

function Tasks() {
  const search = routeApi.useSearch();
  const { data: tasks } = useSuspenseQuery(queryTasksOptions(search));

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-base-content text-xl">Tasks</h1>
        <CreateTask />
      </div>
      <Table data={tasks} columns={columns} />
    </div>
  );
}

export const Route = createFileRoute("/(authenticated)/tasks/")({
  component: Tasks,
  errorComponent: RouteErrorComponent,
  validateSearch: tasksSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ context, deps }) => {
    return context.queryClient.ensureQueryData(queryTasksOptions(deps));
  },
  pendingComponent: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="dsy-skeleton h-7 w-16" />
        <div className="dsy-skeleton h-8 w-28" />
      </div>
      <div className="overflow-x-auto">
        <table className="dsy-table dsy-table-pin-rows md:dsy-table-md dsy-table-xs">
          <thead>
            <tr>
              {["Name", "Label", "Status", "Priority", "Project", ""].map(
                (col) => (
                  <th
                    key={col}
                    className="text-base-content/50 text-xs uppercase tracking-wider"
                  >
                    {col}
                  </th>
                ),
              )}
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
                  <div className="dsy-skeleton h-4 w-16" />
                </td>
                <td>
                  <div className="dsy-skeleton h-4 w-20" />
                </td>
                <td>
                  <div className="dsy-skeleton h-4 w-16" />
                </td>
                <td>
                  <div className="dsy-skeleton h-4 w-24" />
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
