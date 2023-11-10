import { useMutation } from '@tanstack/react-query';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { App } from 'todos-api';

import { CompletedBadge } from '../components/atoms/CompletedBadge';
import { TagBadges } from '../components/atoms/TagBadges';
import { TasksTableActions } from '../components/atoms/TasksTableActions';
import { Table } from '../components/molecules/Table';
import { TasksForm } from '../components/molecules/TasksForm';
import { deleteTask, patchTask } from '../lib/api';
import { route } from './Tasks.route';

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'short',
  timeStyle: 'short',
});

const formatDate = (date: string) => dateFormatter.format(new Date(date));

const columnHelper =
  createColumnHelper<App['schema']['/tasks']['get']['response'][200][number]>();

export default function Tasks() {
  const tasks = route.useLoader();
  const updateMutation = useMutation({
    mutationFn: patchTask,
    onMutate: () => {
      route.router?.cancelMatches();
    },
    onSuccess: async () => {
      await route.router?.invalidate();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onMutate: () => {
      route.router?.cancelMatches();
    },
    onSuccess: async () => {
      await route.router?.invalidate();
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
        <div className='basis-full px-8 md:basis-1/2'>
          <TasksForm />
        </div>
      </div>
      <Table data={tasks} columns={columns} />
    </main>
  );
}
