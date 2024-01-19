import type { CellContext } from '@tanstack/react-table';
import { BanIcon, PencilIcon, SaveIcon } from 'lucide-react';
import { useState } from 'react';

import { useEditTask } from '@/hooks/api/useEditTask';
import type { TaskWithId } from '@/hooks/forms/useTasksForm';
import { useTasksFormContext } from '@/hooks/forms/useTasksForm';

// eslint-disable-next-line max-lines-per-function
export const TasksTableNameCell = ({
  info,
}: {
  info: CellContext<TaskWithId, string>;
}) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const { getValues, register } = useTasksFormContext();
  const editMutation = useEditTask();

  return isEditEnabled ? (
    <div className='dsy-join'>
      <input
        type='text'
        placeholder='Type here'
        className='dsy-join-item dsy-input dsy-input-bordered dsy-input-sm w-full max-w-xs'
        {...register(`tasks.${info.row.index}.name`)}
      />
      <button
        className='dsy-join-item dsy-btn dsy-btn-sm dsy-btn-neutral'
        onClick={() => {
          setIsEditEnabled((prev) => !prev);
        }}
      >
        <BanIcon />
      </button>
      <button
        className='dsy-join-item dsy-btn dsy-btn-sm dsy-btn-secondary '
        onClick={() => {
          editMutation.mutate({
            params: {
              id: info.row.original.id,
            },
            body: { name: getValues(`tasks.${info.row.index}.name`) },
          });
          setIsEditEnabled((prev) => !prev);
        }}
      >
        <SaveIcon />
      </button>
    </div>
  ) : (
    <div className='flex items-center gap-2'>
      {info.getValue()}
      <button
        className='dsy-btn dsy-btn-neutral dsy-btn-xs'
        aria-label={`edit ${info.getValue()}`}
        onClick={() => {
          setIsEditEnabled((prev) => !prev);
        }}
      >
        <PencilIcon className='h-4 w-4' />
      </button>
    </div>
  );
};
