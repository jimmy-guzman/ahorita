import { createColumnHelper } from '@tanstack/react-table';
import { formatDistanceToNow } from 'date-fns';

import type { TaskWithId } from '@/hooks/forms/useTasksForm';

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
    cell: (info) => `${formatDistanceToNow(info.getValue())} ago`,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: (info) => `${formatDistanceToNow(info.getValue())} ago`,
  }),
  columnHelper.display({
    header: 'Actions',
    cell: (info) => <TasksTableActions info={info} />,
  }),
];
