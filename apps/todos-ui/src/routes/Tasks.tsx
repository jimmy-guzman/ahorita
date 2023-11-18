import { useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { FormProvider, useFieldArray } from 'react-hook-form';

import { CompletedBadge } from '@/components/atoms/CompletedBadge';
import { TasksTableActions } from '@/components/atoms/TasksTableActions';
import { Table } from '@/components/molecules/Table';
import { TasksForm } from '@/components/molecules/TasksForm';
import { NameField } from '@/components/molecules/TasksNameField';
import { TasksTagsField } from '@/components/molecules/TasksTagsField';
import { useTasksForm } from '@/hooks/forms/useTasksForm';
import { Task } from '@/lib/api';
import { formatDate } from '@/lib/formatters';

import { tasksRoute } from './Tasks.route';

const columnHelper = createColumnHelper<Task & { key: string }>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Task',
    cell: (info) => <NameField info={info} />,
  }),
  columnHelper.accessor('completed', {
    header: 'Completed',
    cell: (info) => <CompletedBadge completed={info.getValue()} />,
  }),
  columnHelper.accessor('tags', {
    header: 'Tags',
    cell: (info) => <TasksTagsField info={info} />,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: (info) => formatDate(info.getValue()),
  }),
  columnHelper.display({
    header: 'Actions',
    cell: (info) => <TasksTableActions info={info} />,
  }),
];

export default function Tasks() {
  const { queryOptions } = tasksRoute.useRouteContext();

  const { data: tasks } = useQuery(queryOptions);
  const form = useTasksForm(tasks);
  const { fields } = useFieldArray({
    control: form.control,
    name: 'tasks',
    keyName: 'key',
  });

  return (
    <main className='flex flex-col gap-4'>
      <div className='prose lg:prose-xl dsy-prose'>
        <h1>Tasks</h1>
      </div>
      <div className='flex justify-center gap-4'>
        <div className='basis-full md:basis-1/2'>
          <TasksForm />
        </div>
      </div>
      <FormProvider {...form}>
        {tasks && <Table data={fields} columns={columns} />}
      </FormProvider>
    </main>
  );
}
