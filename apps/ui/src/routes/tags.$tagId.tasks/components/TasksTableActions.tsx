import type { CellContext } from '@tanstack/react-table';
import { CheckSquareIcon, Trash2Icon } from 'lucide-react';

import { useDeleteTask } from '@/hooks/api/useDeleteTask';
import { useEditTask } from '@/hooks/api/useEditTask';
import type { TaskWithId } from '@/hooks/forms/useTasksForm';

export const TasksTableActions = ({
  info,
}: {
  info: CellContext<TaskWithId, unknown>;
}) => {
  const task = info.row.original;
  const deleteMutation = useDeleteTask();
  const editMutation = useEditTask();

  return (
    <div className='flex gap-2'>
      <button className='dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-accent'>
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
      <button className='dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-neutral'>
        <Trash2Icon
          className='align-baseline'
          onClick={() => {
            deleteMutation.mutate({ params: task });
          }}
        />
      </button>
    </div>
  );
};
