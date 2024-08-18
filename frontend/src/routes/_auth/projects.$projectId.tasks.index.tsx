import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { ListPlusIcon } from "lucide-react";

import { queryTasksOptions } from "@/api/query-tasks";
import { Table } from "@/components/shared/table";
import { columns } from "@/components/tasks-table/columns";

const routeApi = getRouteApi("/_auth/projects/$projectId/tasks");

function Tasks() {
  const params = routeApi.useParams();
  const { data: tasks } = useSuspenseQuery(queryTasksOptions(params));

  return (
    <div className="flex flex-col gap-4 md:container md:mx-auto md:px-8">
      <div className="flex justify-between">
        <div className="prose dsy-prose">
          <h2>Tasks</h2>
        </div>
        <Link
          className="dsy-btn dsy-btn-accent dsy-btn-sm"
          to="/projects/$projectId/tasks/new"
          params={params}
        >
          New Task <ListPlusIcon />
        </Link>
      </div>
      <Table
        data={tasks}
        columns={columns}
        enableGlobalFiltering
        globalFilterPlaceholder="Filter Tasks..."
      />
    </div>
  );
}

export const Route = createFileRoute("/_auth/projects/$projectId/tasks/")({
  component: Tasks,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(queryTasksOptions(params));
  },
});
