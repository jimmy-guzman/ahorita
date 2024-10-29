import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, getRouteApi } from "@tanstack/react-router";
import { valibotSearchValidator } from "@tanstack/router-valibot-adapter";
import * as v from "valibot";

import { queryTasksOptions } from "@/api/query-tasks";
import { CreateTask } from "@/components/create-task";
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

const routeApi = getRouteApi("/_auth/tasks/");

function Tasks() {
  const search = routeApi.useSearch();
  const { data: tasks } = useSuspenseQuery(queryTasksOptions(search));

  return (
    <div className="flex flex-col gap-4 md:container md:mx-auto md:px-8">
      <div className="flex justify-between">
        <div className="prose dsy-prose">
          <h2>Tasks</h2>
        </div>
        <CreateTask />
      </div>
      <Table data={tasks} columns={columns} />
    </div>
  );
}

export const Route = createFileRoute("/_auth/tasks/")({
  component: Tasks,
  validateSearch: valibotSearchValidator(tasksSearchSchema),
  loaderDeps: ({ search }) => search,
  loader: async ({ context, deps }) => {
    await context.queryClient.ensureQueryData(queryTasksOptions(deps));
  },
});
