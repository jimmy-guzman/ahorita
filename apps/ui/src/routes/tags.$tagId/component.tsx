import { Outlet } from '@tanstack/react-router';

import { TagCard } from './components/TagCard';

export default function Tag() {
  return (
    <section className='flex w-full flex-col gap-4'>
      <TagCard />
      <Outlet />
    </section>
  );
}
