import { CreateTagForm } from '@/components/molecules/AddTagForm';

export default function AddTag() {
  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='prose lg:prose-xl dsy-prose'>
        <h3>Add Your New Tag</h3>
      </div>
      <CreateTagForm />
    </div>
  );
}
