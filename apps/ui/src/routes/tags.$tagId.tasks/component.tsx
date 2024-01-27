import { useSuspenseQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';
import { FormProvider, useFieldArray } from 'react-hook-form';

import { tasksByTagQueryOptions } from '@/api/queryTasksByTag';
import { Table } from '@/components/Table';
import { useTasksForm } from '@/hooks/forms/useTasksForm';

import { columns } from './components/TaskTable.columns';

const routeApi = getRouteApi('/tags/$tagId/tasks');

export default function TasksByTag() {
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
}
