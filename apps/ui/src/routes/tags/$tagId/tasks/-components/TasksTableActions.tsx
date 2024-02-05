import { useMutation } from '@tanstack/react-query';
import type { CellContext } from '@tanstack/react-table';
import { CheckSquareIcon, SquareIcon, Trash2Icon } from 'lucide-react';

import { deleteTaskMutationOptions } from '@/api/deleteTask';
import { editTaskMutationOptions } from '@/api/editTask';

interface TaskTableActionsProps {
  info: CellContext<
    {
      id: string;
      name: string;
      completed: boolean;
      createdAt: Date;
      updatedAt: Date;
    },
    unknown
  >;
}

export const TasksTableActions = ({
  info: {
    row: { original: task },
  },
}: TaskTableActionsProps) => {
  const deleteMutation = useMutation(deleteTaskMutationOptions);
  const editMutation = useMutation(editTaskMutationOptions);

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
