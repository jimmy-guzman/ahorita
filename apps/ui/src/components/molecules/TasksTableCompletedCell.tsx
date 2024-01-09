import type { CellContext } from '@tanstack/react-table';

import type { Task } from '@/lib/api';

export const TasksTableCompletedCell = ({
  info,
}: {
  info: CellContext<Task & { key: string }, boolean>;
}) => {
  return info.getValue() ? (
    <span className='dsy-badge dsy-badge-success'>yes</span>
  ) : (
    <span className='dsy-badge dsy-badge-warning'>no</span>
  );
};
