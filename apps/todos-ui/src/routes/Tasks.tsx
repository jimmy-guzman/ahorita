import { useMutation, useQuery } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { CompletedBadge } from '../components/atoms/CompletedBadge';
import { TagBadges } from '../components/atoms/TagBadges';
import { TasksTableActions } from '../components/atoms/TasksTableActions';
import { Table } from '../components/molecules/Table';
import { TasksForm } from '../components/molecules/TasksForm';
import { deleteTask, patchTask, Task } from '../lib/api';
import { formatDate } from '../lib/formatters';
import { route } from './Tasks.route';

const columnHelper = createColumnHelper<Task>();

export default function Tasks() {
  const { queryOptions, queryClient } = route.useRouteContext();
  const { data: tasks } = useQuery(queryOptions);

  const updateMutation = useMutation({
    mutationKey: ['UPDATE_TASK'],
    mutationFn: patchTask,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryOptions.queryKey });
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ['DELETE_TASK'],
    mutationFn: deleteTask,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: queryOptions.queryKey });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryOptions.queryKey });
    },
  });

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Task',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('completed', {
        header: 'Completed',
        cell: (info) => <CompletedBadge completed={info.getValue()} />,
      }),
      columnHelper.accessor('tags', {
        header: 'Tags',
        cell: (info) => <TagBadges tags={info.getValue()} />,
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
        id: 'actions',
        cell: (info) => (
          <TasksTableActions
            onComplete={() => {
              updateMutation.mutate({
                id: info.row.original.id,
                completed: !info.row.original.completed,
              });
            }}
            onDelete={() => {
              deleteMutation.mutate(info.row.original);
            }}
          />
        ),
      }),
    ],
    [updateMutation, deleteMutation]
  );

  return (
    <main className='flex flex-col gap-4'>
      <div className='prose lg:prose-xl daisy-prose'>
        <h1>Tasks</h1>
      </div>
      <div className='flex justify-center'>
        <div className='basis-full md:basis-1/2'>
          <TasksForm />
        </div>
      </div>
      {tasks && <Table data={tasks} columns={columns} />}
    </main>
  );
}
