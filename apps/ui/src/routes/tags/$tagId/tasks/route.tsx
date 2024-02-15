import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { getRouteApi } from "@tanstack/react-router";
import { FormProvider } from "react-hook-form";

import { tasksByTagQueryOptions } from "@/api/queryTasksByTag";
import { Table } from "@/components/Table";
import { useTasksForm } from "@/routes/tags/$tagId/tasks/-hooks/useTasksForm";

import { columns } from "./-components/columns";

const routeApi = getRouteApi("/tags/$tagId/tasks");

const TasksByTag = () => {
  const { tagId } = routeApi.useParams();
  const { data: tasks } = useSuspenseQuery(tasksByTagQueryOptions(tagId));
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

export const Route = createFileRoute("/tags/$tagId/tasks")({
  component: TasksByTag,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tasksByTagQueryOptions(params.tagId));
  },
});
