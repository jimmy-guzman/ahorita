import { typeboxResolver } from '@hookform/resolvers/typebox';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { getRouteApi, useNavigate } from '@tanstack/react-router';
import { ListPlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { addTaskByTagIdMutationOptions } from '@/api/addTask';
import { TextInput } from '@/components/TextInput';

const routeApi = getRouteApi('/tags/$tagId/add-task');

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

const AddTask = () => {
  const { tagId } = routeApi.useParams();
  const { handleSubmit, control } = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: '',
    },
  });
  const { mutate, isPending } = useMutation(addTaskByTagIdMutationOptions);
  const navigate = useNavigate();

  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='prose dsy-prose'>
        <h2>Add Your New Task</h2>
      </div>
      <form
        className='flex flex-col gap-2'
        onSubmit={handleSubmit((body) => {
          mutate(
            { body, params: { id: tagId } },
            {
              onSuccess() {
                return navigate({
                  to: '/tags/$tagId/tasks',
                  params: { tagId },
                });
              },
            }
          );
        })}
      >
        <TextInput control={control} name='name' label="Your task's name?" />
        <div className='flex justify-end'>
          <button className='dsy-btn dsy-btn-primary' disabled={isPending}>
            Add Task <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
};

export const Route = createFileRoute('/tags/$tagId/add-task')({
  component: AddTask,
});
