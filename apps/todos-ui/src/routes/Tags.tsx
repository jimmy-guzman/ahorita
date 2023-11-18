import { AddTagForm } from '@/components/molecules/AddTagForm';
import { TagsTable } from '@/components/organisms/TagsTable';

export default function Tags() {
  return (
    <main className='flex flex-col gap-4'>
      <div className='prose lg:prose-xl dsy-prose'>
        <h1>Tags</h1>
      </div>
      <div className='flex justify-center gap-4'>
        <div className='basis-full md:basis-1/2'>
          <AddTagForm />
        </div>
      </div>
      <TagsTable />
    </main>
  );
}
