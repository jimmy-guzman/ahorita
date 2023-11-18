import { FormProvider, useFieldArray } from 'react-hook-form';

import { Table } from '@/components/molecules/Table';
import { useQueryTasks } from '@/hooks/api/useQueryTasks';
import { useTasksForm } from '@/hooks/forms/useTasksForm';

import { columns } from './TaskTable.columns';

export const TasksTable = () => {
  const { data: tasks } = useQueryTasks();
  const form = useTasksForm(tasks);
  const { fields } = useFieldArray({
    control: form.control,
    name: 'tasks',
    keyName: 'key',
  });

  return (
    <FormProvider {...form}>
      {tasks && <Table data={fields} columns={columns} />}
    </FormProvider>
  );
};
