import { CellContext } from '@tanstack/react-table';
import { BanIcon, PencilIcon, SaveIcon } from 'lucide-react';
import { useState } from 'react';

import { useEditMutation } from '../../hooks/api/useEditMutation';
import { useTasksFormContext } from '../../hooks/forms/useTasksForm';
import { Task } from '../../lib/api';

export const NameField = ({
  info,
}: {
  info: CellContext<Task & { key: string }, string>;
}) => {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const { getValues, register } = useTasksFormContext();
  const editMutation = useEditMutation();

  return isEditEnabled ? (
    <div className='daisy-join'>
      <input
        type='text'
        placeholder='Type here'
        className='daisy-join-item daisy-input daisy-input-bordered daisy-input-sm w-full max-w-xs'
        {...register(`tasks.${info.row.index}.name`)}
      />
      <button
        className='daisy-join-item daisy-btn daisy-btn-sm daisy-btn-secondary'
        onClick={() => {
          setIsEditEnabled((prev) => !prev);
        }}
      >
        <BanIcon />
      </button>
      <button
        className='daisy-join-item daisy-btn daisy-btn-sm daisy-btn-primary'
        onClick={() => {
          editMutation.mutate({
            id: info.row.original.id,
            name: getValues(`tasks.${info.row.index}.name`),
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
        onClick={() => {
          setIsEditEnabled((prev) => !prev);
        }}
      >
        <PencilIcon className='inline-block h-4 w-4' />
      </button>
    </div>
  );
};
