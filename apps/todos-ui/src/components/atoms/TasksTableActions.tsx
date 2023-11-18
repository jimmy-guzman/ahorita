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
    <div className='daisy-join'>
      <button className='daisy-btn daisy-btn-ghost daisy-join-item daisy-btn-sm'>
        <CheckSquareIcon
          className='align-baseline'
          onClick={() => {
            editMutation.mutate({ id: task.id, completed: !task.completed });
          }}
        />
      </button>
      <button className='daisy-btn daisy-btn-ghost daisy-join-item daisy-btn-sm'>
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
