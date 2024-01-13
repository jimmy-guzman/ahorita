import { clsx } from 'clsx';
import { ListPlusIcon } from 'lucide-react';

import { useAddTaskByTagId } from '@/hooks/api/useAddTask';
import { useAddTaskForm } from '@/hooks/forms/useAddTaskForm';
import { addTaskByTagRoute } from '@/routes/tagsRoute';

export const AddTaskForm = () => {
  const { tagId } = addTaskByTagRoute.useParams();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useAddTaskForm();

  const { mutate, isPending } = useAddTaskByTagId();

  return (
    <form
      className='flex gap-2'
      onSubmit={handleSubmit((body) => {
        mutate(
          { body, params: { id: tagId } },
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
