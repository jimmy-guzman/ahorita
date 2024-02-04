import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getRouteApi } from '@tanstack/react-router';
import { FormProvider, useFieldArray } from 'react-hook-form';

import { tasksByTagQueryOptions } from '@/api/queryTasksByTag';
import { Table } from '@/components/Table';
import { useTasksForm } from '@/hooks/forms/useTasksForm';

import { columns } from './-components/TaskTable.columns';

const routeApi = getRouteApi('/tags/$tagId/tasks');

const TasksByTag = () => {
  const { tagId } = routeApi.useParams();
  const { data: tasks } = useSuspenseQuery(tasksByTagQueryOptions(tagId));

  const form = useTasksForm(tasks);
  const { fields } = useFieldArray({
    control: form.control,
    name: 'tasks',
    keyName: 'key',
  });

  return (
    <FormProvider {...form}>
      <Table data={fields} columns={columns} />
    </FormProvider>
  );
};

export const Route = createFileRoute('/tags/$tagId/tasks')({
  component: TasksByTag,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tasksByTagQueryOptions(params.tagId));
  },
});
