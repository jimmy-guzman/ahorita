import { createColumnHelper } from '@tanstack/react-table';
import { formatDistanceToNowStrict } from 'date-fns';

import { TasksTableActions } from './TasksTableActions';
import { TasksTableCompletedCell } from './TasksTableCompletedCell';
import { TasksTableNameCell } from './TasksTableNameCell';

const columnHelper = createColumnHelper<{
  id: string;
  tagId: string;
  name: string;
  status: 'BACKLOG' | 'CANCELED' | 'DONE' | 'IN_PROGRESS' | 'TODO';
  createdAt: string;
  updatedAt: string;
}>();

export const columns = [
  columnHelper.accessor('name', {
    header: 'Task',
    cell: (info) => <TasksTableNameCell info={info} />,
  }),
  columnHelper.accessor('status', {
    header: 'Completed',
    cell: (info) => <TasksTableCompletedCell info={info} />,
  }),
  columnHelper.accessor('createdAt', {
    header: 'Created At',
    cell: (info) => `${formatDistanceToNowStrict(info.getValue())} ago`,
  }),
  columnHelper.accessor('updatedAt', {
    header: 'Updated At',
    cell: (info) => `${formatDistanceToNowStrict(info.getValue())} ago`,
  }),
  columnHelper.display({
    header: 'Actions',
    cell: (info) => <TasksTableActions info={info} />,
  }),
];
