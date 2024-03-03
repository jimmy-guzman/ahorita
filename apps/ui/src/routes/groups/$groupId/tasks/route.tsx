import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";

import { tasksByGroupQueryOptions } from "@/api/query-tasks-by-group";
import { Table } from "@/components/table";
import { useTasksForm } from "@/routes/groups/$groupId/tasks/-hooks/use-tasks-form";

import { columns } from "./-components/columns";

const routeApi = getRouteApi("/groups/$groupId/tasks");

const TasksByGroup = () => {
  const { groupId } = routeApi.useParams();
  const { data: tasks } = useSuspenseQuery(tasksByGroupQueryOptions(groupId));
  const form = useTasksForm(tasks);

  return (
    <div className="flex w-full flex-col gap-8">
      <div className="prose dsy-prose">
        <h2>Your Tasks</h2>
      </div>
      <FormProvider {...form}>
        <Table data={tasks} columns={columns} />
      </FormProvider>
    </div>
  );
};

export const Route = createFileRoute("/groups/$groupId/tasks")({
  component: TasksByGroup,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tasksByGroupQueryOptions(params.groupId));
  },
});
