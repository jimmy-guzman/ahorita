import { useSuspenseQuery } from '@tanstack/react-query';
import { FormProvider, useFieldArray } from 'react-hook-form';

import { Table } from '@/components/molecules/Table';
import { tasksQueryOptions } from '@/hooks/api/useQueryTasks';
import { useTasksForm } from '@/hooks/forms/useTasksForm';

import { columns } from './TaskTable.columns';

export const TasksTable = () => {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions);
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
