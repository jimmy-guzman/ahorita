import type { CellContext } from '@tanstack/react-table';

export const TasksTableCompletedCell = ({
  info,
}: {
  info: CellContext<
    {
      id: string;
      tagId: string;
      name: string;
      completed: boolean;
      createdAt: string;
      updatedAt: string;
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
