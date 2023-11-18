import { CellContext } from '@tanstack/react-table';
import { CheckSquareIcon, TrashIcon } from 'lucide-react';

import { useDeleteMutation } from '../../hooks/api/useDeleteMutation';
import { useEditMutation } from '../../hooks/api/useEditMutation';
import { Task } from '../../lib/api';

export const TasksTableActions = ({
  info,
}: {
  info: CellContext<
    Task & {
      key: string;
    },
    unknown
  >;
}) => {
  const task = info.row.original;
  const deleteMutation = useDeleteMutation();
  const editMutation = useEditMutation();

  return (
    <div className='dsy-join'>
      <button className='dsy-btn dsy-btn-ghost dsy-join-item dsy-btn-sm'>
        <CheckSquareIcon
          className='align-baseline'
          onClick={() => {
            editMutation.mutate({
              params: { id: task.id },
              body: { completed: !task.completed },
            });
          }}
        />
      </button>
      <button className='dsy-btn dsy-btn-ghost dsy-join-item dsy-btn-sm'>
        <TrashIcon
          className='align-baseline'
          onClick={() => {
            deleteMutation.mutate(task);
          }}
        />
      </button>
    </div>
  );
};
