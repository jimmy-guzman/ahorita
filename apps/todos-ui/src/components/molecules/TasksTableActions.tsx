import { CellContext } from '@tanstack/react-table';
import { CheckSquareIcon, TrashIcon } from 'lucide-react';

import { useDeleteTask } from '@/hooks/api/useDeleteTask';
import { useEditTask } from '@/hooks/api/useEditTask';
import { Task } from '@/lib/api';

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
  const deleteMutation = useDeleteTask();
  const editMutation = useEditTask();

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
