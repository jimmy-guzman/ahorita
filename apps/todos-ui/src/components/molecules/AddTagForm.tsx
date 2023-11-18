import { clsx } from 'clsx';
import { ListPlusIcon } from 'lucide-react';

import { useAddTagFormHooks } from './AddTagForm.hooks';

export const AddTagForm = () => {
  const {
    mutation,
    form: {
      handleSubmit,
      register,
      formState: { errors, isValid, isSubmitted },
    },
  } = useAddTagFormHooks();

  return (
    <form
      className='flex gap-2'
      onSubmit={handleSubmit((values) => {
        mutation.mutate(values);
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
      <button
        className={clsx('dsy-btn dsy-btn-primary', {
          'dsy-btn-error': mutation.isError || (!isValid && isSubmitted),
        })}
      >
        Add Tag <ListPlusIcon />
      </button>
    </form>
  );
};
