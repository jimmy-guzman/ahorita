import type { CellContext } from '@tanstack/react-table';

export const TasksTableCompletedCell = ({
  info,
}: {
  info: CellContext<
    {
      id: string;
      name: string;
      completed: boolean;
      createdAt: Date;
      updatedAt: Date;
    },
    boolean
  >;
}) => {
  return info.getValue() ? (
    <span className='dsy-badge dsy-badge-success'>yes</span>
  ) : (
    <span className='dsy-badge dsy-badge-warning'>no</span>
  );
};
