import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";

import { tasksByGroupQueryOptions } from "@/api/query-tasks-by-group";
import { Table } from "@/components/table";
import { useTasksForm } from "@/routes/groups/$groupId/tasks/-hooks/use-tasks-form";

import { ListPlusIcon } from "lucide-react";
import { columns } from "./-components/columns";

const routeApi = getRouteApi("/groups/$groupId/tasks");

const TasksByGroup = () => {
  const { groupId } = routeApi.useParams();
  const { data: tasks } = useSuspenseQuery(tasksByGroupQueryOptions(groupId));
  const form = useTasksForm(tasks);

  return (
    <div className="flex flex-col gap-4 md:container md:mx-auto md:px-8">
      <div className="flex justify-between">
        <div className="prose dsy-prose">
          <h2>Tasks</h2>
        </div>
        <Link
          className="dsy-btn dsy-btn-accent"
          to="/groups/$groupId/tasks/new"
          params={{ groupId }}
        >
          New Task <ListPlusIcon />
        </Link>
      </div>
      <FormProvider {...form}>
        <Table
          data={tasks}
          columns={columns}
          enableGlobalFiltering
          globalFilterPlaceholder="Filter Tasks"
        />
      </FormProvider>
    </div>
  );
};

export const Route = createFileRoute("/groups/$groupId/tasks/")({
  component: TasksByGroup,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tasksByGroupQueryOptions(params.groupId));
  },
});
