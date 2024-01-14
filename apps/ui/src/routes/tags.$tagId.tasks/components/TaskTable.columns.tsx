import { createColumnHelper } from '@tanstack/react-table';

import type { TaskWithId } from '@/hooks/forms/useTasksForm';
import { formatDate } from '@/utils/formatters';

import { TasksTableActions } from './TasksTableActions';
import { TasksTableCompletedCell } from './TasksTableCompletedCell';
import { TasksTableNameCell } from './TasksTableNameCell';

const columnHelper = createColumnHelper<TaskWithId>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'Task',
    cell: (info) => <TasksTableNameCell info={info} />,
  }),
  columnHelper.accessor('completed', {
    header: 'Completed',
    cell: (info) => <TasksTableCompletedCell info={info} />,
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
