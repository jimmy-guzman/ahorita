import { createColumnHelper } from '@tanstack/react-table';

import { TasksTableActions } from '@/components/molecules/TasksTableActions';
import { TasksTableCompletedCell } from '@/components/molecules/TasksTableCompletedCell';
import { TasksTableNameCell } from '@/components/molecules/TasksTableNameCell';
import { TasksTableTagsCell } from '@/components/molecules/TasksTableTagsCell';
import type { Task } from '@/lib/api';
import { formatDate } from '@/lib/formatters';

const columnHelper = createColumnHelper<Task & { key: string }>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'Task',
    cell: (info) => <TasksTableNameCell info={info} />,
  }),
  columnHelper.accessor('completed', {
    header: 'Completed',
    cell: (info) => <TasksTableCompletedCell info={info} />,
  }),
  columnHelper.accessor('tags', {
    header: 'Tags',
    cell: (info) => <TasksTableTagsCell info={info} />,
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
