import { clsx } from 'clsx';
import { ListPlusIcon } from 'lucide-react';

import { useAddTag } from '@/hooks/api/useAddTag';
import { useAddTagForm } from '@/hooks/forms/useAddTagForm';

// eslint-disable-next-line max-lines-per-function
export default function AddTag() {
  const { mutate, isPending } = useAddTag();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useAddTagForm();

  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='prose lg:prose-xl dsy-prose'>
        <h3>Add Your New Tag</h3>
      </div>
      <form
        className='flex flex-col gap-2'
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
        <div className='dsy-form-control'>
          <label className='dsy-label' htmlFor='name'>
            <span className='dsy-label-text'>Your tag&apos;s name?</span>
          </label>
          <input
            type='text'
            id='name'
            className={clsx(
              'dsy-input dsy-input-bordered w-full',
              errors.name?.message ? 'dsy-input-error' : ''
            )}
            {...register('name')}
          />
          {errors.name?.message ? (
            <p className='text-error'>{errors.name.message}</p>
          ) : (
            <p className='invisible'>&nbsp;</p>
          )}
        </div>
        <div className='dsy-form-control'>
          <label className='dsy-label' htmlFor='description'>
            <span className='dsy-label-text'>Your tag&apos;s description?</span>
          </label>
          <input
            type='text'
            id='description'
            className={clsx(
              'dsy-input dsy-input-bordered w-full',
              errors.name?.message ? 'dsy-input-error' : ''
            )}
            {...register('description')}
          />
          {errors.description?.message ? (
            <p className='text-error'>{errors.description.message}</p>
          ) : (
            <p className='invisible'>&nbsp;</p>
          )}
        </div>
        <div className='flex justify-end'>
          <button className="dsy-btn dsy-btn-primary" disabled={isPending}>
            Add Tag <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
