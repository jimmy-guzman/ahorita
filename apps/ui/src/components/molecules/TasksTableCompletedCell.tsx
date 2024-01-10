import type { CellContext } from '@tanstack/react-table';

import type { TaskWithId } from '@/hooks/forms/useTasksForm';

export const TasksTableCompletedCell = ({
  info,
}: {
  info: CellContext<TaskWithId, boolean>;
}) => {
  return info.getValue() ? (
    <span className='dsy-badge dsy-badge-success'>yes</span>
  ) : (
    <span className='dsy-badge dsy-badge-warning'>no</span>
  );
};
