import { createFileRoute, Outlet } from '@tanstack/react-router';

import { tagQueryOptions } from '@/api/queryTag';

import { TagCard } from './-components/TagCard';

const Tag = () => {
  return (
    <section className='flex w-full flex-col gap-4'>
      <TagCard />
      <Outlet />
    </section>
  );
};

export const Route = createFileRoute('/tags/$tagId')({
  component: Tag,
  loader: async ({ context: { queryClient }, params }) => {
    await queryClient.ensureQueryData(tagQueryOptions(params.tagId));
  },
});
