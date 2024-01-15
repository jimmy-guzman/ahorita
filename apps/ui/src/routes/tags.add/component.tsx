import { ListPlusIcon } from 'lucide-react';

import { TextInput } from '@/components/TextInput';
import { useAddTag } from '@/hooks/api/useAddTag';
import { useAddTagForm } from '@/hooks/forms/useAddTagForm';

export default function AddTag() {
  const { mutate, isPending } = useAddTag();
  const { handleSubmit, reset, control } = useAddTagForm();

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
        <TextInput control={control} name='name' label="Your tag's name?" />
        <TextInput
          control={control}
          name='description'
          label="Your tag's description?"
        />
        <div className='flex justify-end'>
          <button className='dsy-btn dsy-btn-primary' disabled={isPending}>
            Add Tag <ListPlusIcon />
          </button>
        </div>
      </form>
    </div>
  );
}
