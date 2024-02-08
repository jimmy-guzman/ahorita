import type { CellContext } from '@tanstack/react-table';

export const TasksTableCompletedCell = ({
  info,
}: {
  info: CellContext<
    {
      id: string;
      tagId: string;
      name: string;
      status: 'BACKLOG' | 'CANCELED' | 'DONE' | 'IN_PROGRESS' | 'TODO';
      createdAt: string;
      updatedAt: string;
    },
    'BACKLOG' | 'CANCELED' | 'DONE' | 'IN_PROGRESS' | 'TODO'
  >;
}) => {
  return info.getValue() === 'DONE' ? (
    <span className='dsy-badge dsy-badge-success'>yes</span>
  ) : (
    <span className='dsy-badge dsy-badge-warning'>no</span>
  );
};
