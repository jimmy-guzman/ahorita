import { clsx } from 'clsx';
import { ListPlusIcon } from 'lucide-react';

import { useAddTask } from '@/hooks/api/useAddTask';
import { useAddTaskForm } from '@/hooks/forms/useAddTaskForm';

export const AddTaskForm = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useAddTaskForm();

  const { mutate, isPending } = useAddTask();

  return (
    <form
      className='flex gap-2'
      onSubmit={handleSubmit((body) => {
        mutate(
          { body },
          {
            onSuccess: () => {
              reset();
            },
          }
        );
      })}
    >
      <div className='dsy-form-control w-full'>
        <input
          type='text'
          placeholder="Your task's name?"
          className={clsx(
            'dsy-input dsy-input-bordered w-full',
            errors.name?.message ? 'dsy-input-error' : 'dsy-input-primary'
          )}
          {...register('name')}
        />
        {errors.name?.message ? (
          <p className='text-error'>{errors.name.message}</p>
        ) : (
          <p className='invisible'>&nbsp;</p>
        )}
      </div>
      <button className={'dsy-btn dsy-btn-primary'} disabled={isPending}>
        Add Task <ListPlusIcon />
      </button>
    </form>
  );
};
