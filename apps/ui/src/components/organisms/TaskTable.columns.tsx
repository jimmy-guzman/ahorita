import { createColumnHelper } from '@tanstack/react-table';

import { TasksTableActions } from '@/components/molecules/TasksTableActions';
import { TasksTableCompletedCell } from '@/components/molecules/TasksTableCompletedCell';
import { TasksTableNameCell } from '@/components/molecules/TasksTableNameCell';
import type { TaskWithId } from '@/hooks/forms/useTasksForm';
import { formatDate } from '@/utils/formatters';

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
