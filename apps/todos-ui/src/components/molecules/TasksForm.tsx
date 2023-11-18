import { clsx } from 'clsx';
import { ListPlusIcon } from 'lucide-react';

import { useTasksFormHooks } from './TasksForm.hooks';

export const TasksForm = () => {
  const {
    mutation,
    form: {
      handleSubmit,
      register,
      formState: { errors, isValid, isSubmitted },
    },
  } = useTasksFormHooks();

  return (
    <form
      className='flex gap-2'
      onSubmit={handleSubmit((values) => {
        mutation.mutate(values);
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
      <button
        className={clsx('dsy-btn dsy-btn-primary', {
          'dsy-btn-error': mutation.isError || (!isValid && isSubmitted),
        })}
      >
        Add Task <ListPlusIcon />
      </button>
    </form>
  );
};
