import { clsx } from 'clsx';

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
      <div className='daisy-form-control w-full'>
        <input
          type='text'
          placeholder="Your task's name?"
          className={clsx(
            'daisy-input daisy-input-bordered w-full',
            errors.name?.message ? 'daisy-input-error' : 'daisy-input-primary'
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
        className={clsx('daisy-btn daisy-btn-primary', {
          'daisy-btn-error': mutation.isError || (!isValid && isSubmitted),
        })}
      >
        Add Task
      </button>
    </form>
  );
};
