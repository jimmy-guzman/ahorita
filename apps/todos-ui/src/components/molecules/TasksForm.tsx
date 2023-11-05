import { edenFetch } from '@elysiajs/eden';
import { typeboxResolver } from '@hookform/resolvers/typebox';
import { Static, Type } from '@sinclair/typebox';
import { useMutation } from '@tanstack/react-query';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { App, Task } from 'todos-api';

import { route } from '../../routes/Tasks.route';
import { SubmitButton } from '../atoms/SubmitButton';

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

const fetch = edenFetch<App>('http://localhost:3000');

export const TasksForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: async ({ name }: Pick<Task, 'name'>) => {
      const response = await fetch('/tasks', {
        method: 'POST',
        body: { name },
      });

      if (response.error) {
        throw new Error(response.error.value);
      }
      return response.data;
    },
    onMutate: () => {
      route.router?.cancelMatches();
    },
    onSuccess: async ({ name }) => {
      await route.router?.invalidate();
      toast.success(`Create new task: ${name}`);
    },
  });

  return (
    <form
      className='flex gap-2'
      onSubmit={handleSubmit(async (values) => {
        mutation.mutate(values);
      })}
    >
      <div className='form-control w-full'>
        <input
          type='text'
          placeholder="Your task's name"
          className={clsx(
            'daisy-input daisy-input-bordered w-full',
            errors.name?.message ? 'daisy-input-error' : 'daisy-input-primary'
          )}
          {...register('name')}
        />
        {errors.name?.message && (
          <p className='text-error'>{errors.name.message}</p>
        )}
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
