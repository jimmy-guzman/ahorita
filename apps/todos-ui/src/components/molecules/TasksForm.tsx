import { typeboxResolver } from '@hookform/resolvers/typebox';
import { Static, Type } from '@sinclair/typebox';
import { useMutation } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { createTodos } from '../../lib/api';
import { route } from '../../routes/Tasks.route';
import { SubmitButton } from '../atoms/SubmitButton';

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export const TasksForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createTodos,
    onMutate: () => {
      route.router?.cancelMatches();
    },
    onSuccess: async ({ name }) => {
      await route.router?.invalidate();
      reset();
      toast.success(`Created new task: ${name}`);
    },
  });

  return (
    <form
      className='flex gap-2'
      onSubmit={handleSubmit(async (values) => {
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
        <p className='text-error'>{errors.name?.message}</p>
      </div>
      <SubmitButton
        control={control}
        isSubmitting={mutation.isPending}
        isError={mutation.isError}
      >
        Create Task
      </SubmitButton>
    </form>
  );
};
