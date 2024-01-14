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
  const deleteMutation = useDeleteTask();
  const editMutation = useEditTask();

  return (
    <div className='flex gap-2'>
      <button
        aria-label={`Complete ${info.row.original.name}`}
        className='dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-accent'
      >
        <CheckSquareIcon
          className='align-baseline'
          onClick={() => {
            editMutation.mutate({
              params: { id: info.row.original.id },
              body: { completed: !info.row.original.completed },
            });
          }}
        />
      </button>
      <button
        aria-label={`Delete ${info.row.original.name}`}
        className='dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-neutral'
      >
        <Trash2Icon
          className='align-baseline'
          onClick={() => {
            deleteMutation.mutate({ params: info.row.original });
          }}
        />
      </button>
    </div>
  );
};
