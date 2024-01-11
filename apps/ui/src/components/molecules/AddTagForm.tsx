import { clsx } from 'clsx';
import { ListPlusIcon } from 'lucide-react';

import { useAddTag } from '@/hooks/api/useAddTag';
import { useAddTagForm } from '@/hooks/forms/useAddTagForm';

export const AddTagForm = () => {
  const { mutate, isPending } = useAddTag();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useAddTagForm();

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
      <div className='dsy-form-control flex-none'>
        <input
          type='text'
          placeholder="Your tag's name?"
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
      <div className='dsy-form-control grow'>
        <input
          type='text'
          placeholder="Your tag's description?"
          className={clsx(
            'dsy-input dsy-input-bordered w-full',
            errors.name?.message ? 'dsy-input-error' : 'dsy-input-primary'
          )}
          {...register('description')}
        />
        {errors.description?.message ? (
          <p className='text-error'>{errors.description.message}</p>
        ) : (
          <p className='invisible'>&nbsp;</p>
        )}
      </div>
      <button className={'dsy-btn dsy-btn-primary'} disabled={isPending}>
        Add Tag <ListPlusIcon />
      </button>
    </form>
  );
};
