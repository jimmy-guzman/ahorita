import { TagsTable } from '@/components/organisms/TagsTable';

export default function Tags() {
  return (
    <main className='flex flex-col gap-4'>
      <div className='prose lg:prose-xl dsy-prose'>
        <h1>Tags</h1>
      </div>
      <TagsTable />
    </main>
  );
}
