import type { CellContext } from '@tanstack/react-table';
import { CheckSquareIcon, SquareIcon, Trash2Icon } from 'lucide-react';

import { useDeleteTask } from '@/hooks/api/useDeleteTask';
import { useEditTask } from '@/hooks/api/useEditTask';
import type { TaskWithId } from '@/hooks/forms/useTasksForm';

export const TasksTableActions = ({
  info: {
    row: { original: task },
  },
}: {
  info: CellContext<TaskWithId, unknown>;
}) => {
  const deleteMutation = useDeleteTask();
  const editMutation = useEditTask();

  return (
    <div className='flex gap-2'>
      {task.completed ? (
        <button
          aria-label={`Complete ${task.name}`}
          className='dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-success'
          onClick={() => {
            editMutation.mutate({
              params: { id: task.id },
              body: { completed: false },
            });
          }}
        >
          <CheckSquareIcon className='align-baseline' />
        </button>
      ) : (
        <button
          aria-label={`Undo Complete ${task.name}`}
          className='dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-warning'
          onClick={() => {
            editMutation.mutate({
              params: { id: task.id },
              body: { completed: true },
            });
          }}
        >
          <SquareIcon className='align-baseline' />
        </button>
      )}
      <button
        aria-label={`Delete ${task.name}`}
        className='dsy-btn dsy-btn-square dsy-join-item dsy-btn-sm dsy-btn-neutral'
        onClick={() => deleteMutation.mutate(task.id)}
      >
        <Trash2Icon className='align-baseline' />
      </button>
    </div>
  );
};
