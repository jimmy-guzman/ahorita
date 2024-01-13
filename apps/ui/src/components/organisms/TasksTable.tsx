import { FormProvider, useFieldArray } from 'react-hook-form';

import { Table } from '@/components/molecules/Table';
import { useTasksForm } from '@/hooks/forms/useTasksForm';

import { columns } from './TaskTable.columns';

export const TasksTable = ({
  tasks,
}: {
  tasks: {
    id: string;
    name: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}) => {
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
