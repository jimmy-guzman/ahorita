import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";

import { tasksByProjectQueryOptions } from "@/api/query-tasks-by-project";
import { Table } from "@/components/table";

import { columns } from "./-components/columns";

const routeApi = getRouteApi("/projects/$projectId/tasks");

const TasksByProject = () => {
  const { projectId } = routeApi.useParams();
  const { data: tasks } = useSuspenseQuery(
    tasksByProjectQueryOptions(projectId),
  );

  return (
    <div className="flex flex-col gap-4 md:container md:mx-auto md:px-8">
      <div className="flex justify-between">
        <div className="prose dsy-prose">
          <h2>Tasks</h2>
        </div>
        <Link
          className="dsy-btn dsy-btn-accent dsy-btn-sm"
          to="/projects/$projectId/tasks/new"
          params={{ projectId }}
        >
          New Task <PlusIcon />
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
};

export const Route = createFileRoute("/projects/$projectId/tasks/")({
  component: TasksByProject,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(
      tasksByProjectQueryOptions(params.projectId),
    );
  },
});
