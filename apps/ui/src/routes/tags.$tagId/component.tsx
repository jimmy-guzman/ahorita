import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { EyeIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';

import { useDeleteTag } from '@/hooks/api/useDeleteTag';
import { tagQueryOptions } from '@/hooks/api/useTag';

import { tagRoute } from './route';

export default function Tag() {
  const { tagId } = tagRoute.useParams();
  const { data } = useSuspenseQuery(tagQueryOptions(tagId));
  const { mutateAsync, isPending } = useDeleteTag();
  const navigate = useNavigate();

  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='dsy-card bg-base-200'>
        <div className='dsy-card-body'>
          <h2 className='dsy-card-title text-primary'>{data.name}</h2>
          <p>{data.description}</p>
          <div className='dsy-card-actions justify-end'>
            <button
              className='dsy-btn dsy-btn-outline'
              disabled={isPending}
              onClick={async () => {
                await mutateAsync({ params: { id: tagId } });
                await navigate({ to: '/tags' });
              }}
            >
              Delete Tag
              <TrashIcon className='inline' />
            </button>
            <Link
              className='dsy-btn dsy-btn-outline dsy-btn-secondary'
              to='/tags/$tagId/tasks/add'
              params={{ tagId }}
              activeProps={{ className: 'dsy-btn-active' }}
            >
              Add Task
              <PlusCircleIcon className='inline' />
            </Link>
            <Link
              className='dsy-btn dsy-btn-outline dsy-btn-primary'
              to='/tags/$tagId/tasks'
              disabled={data._count.tasks <= 0}
              params={{ tagId }}
              activeOptions={{ exact: true }}
              activeProps={{ className: 'dsy-btn-active' }}
            >
              {data._count.tasks} Tasks
              <EyeIcon className='inline' />
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
