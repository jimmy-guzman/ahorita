import { useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, useFieldArray } from 'react-hook-form';

import { Table } from '@/components/Table';
import { tasksByTagQueryOptions } from '@/hooks/api/useTasksByTag';
import { useTasksForm } from '@/hooks/forms/useTasksForm';

import { columns } from './components/TaskTable.columns';
import { tasksByTagRoute } from './route';

export default function TasksByTag() {
  const { tagId } = tasksByTagRoute.useParams();
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
