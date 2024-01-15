import { RouteApi } from '@tanstack/react-router';
import { ListPlusIcon } from 'lucide-react';

import { TextInput } from '@/components/TextInput';
import { useAddTaskByTagId } from '@/hooks/api/useAddTask';
import { useAddTaskForm } from '@/hooks/forms/useAddTaskForm';

const routeApi = new RouteApi({ id: '/tags/$tagId/tasks/add' });

export default function Component() {
  const { tagId } = routeApi.useParams();
  const { handleSubmit, reset, control } = useAddTaskForm();
  const { mutate, isPending } = useAddTaskByTagId();

  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='prose lg:prose-xl dsy-prose'>
        <h3>Add Your New Task</h3>
      </div>
      <form
        className='flex flex-col gap-2'
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
        <TextInput control={control} name='name' label="Your task's name?" />
        <div className='flex justify-end'>
          <button className='dsy-btn dsy-btn-primary' disabled={isPending}>
            Add Task <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
