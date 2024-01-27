import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { ListPlusIcon } from 'lucide-react';

import { addTagMutationOptions } from '@/api/addTag';
import { TextInput } from '@/components/TextInput';
import { useAddTagForm } from '@/hooks/forms/useAddTagForm';

export default function AddTag() {
  const { mutate, isPending } = useMutation(addTagMutationOptions);
  const { handleSubmit, control } = useAddTagForm();
  const navigate = useNavigate();

  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='prose dsy-prose'>
        <h1>Add Your New Tag</h1>
      </div>
      <form
        className='flex flex-col gap-2'
        onSubmit={handleSubmit((body) => {
          mutate(body, {
            onSuccess(tag) {
              return navigate({
                to: '/tags/$tagId',
                params: { tagId: tag.id },
              });
            },
          });
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
