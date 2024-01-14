import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet, useNavigate } from '@tanstack/react-router';
import { RouteApi } from '@tanstack/react-router';
import { EyeIcon, ListPlusIcon, Trash2Icon } from 'lucide-react';

import { useDeleteTag } from '@/hooks/api/useDeleteTag';
import { tagQueryOptions } from '@/hooks/api/useTag';

const routeApi = new RouteApi({ id: '/tags/$tagId' });

export default function Tag() {
  const { tagId } = routeApi.useParams();
  const { data: tag } = useSuspenseQuery(tagQueryOptions(tagId));
  const { mutateAsync, isPending } = useDeleteTag();
  const navigate = useNavigate();

  return (
    <section className='flex w-full flex-col gap-4'>
      <div className='dsy-card bg-base-200'>
        <div className='dsy-card-body'>
          <h2 className='dsy-card-title text-primary'>{tag.name}</h2>
          <p>{tag.description}</p>
          <div className='dsy-card-actions justify-end'>
            <button
              className='dsy-btn dsy-btn-sm dsy-btn-neutral'
              disabled={isPending}
              onClick={async () => {
                await mutateAsync({ params: { id: tagId } });
                await navigate({ to: '/tags/add' });
              }}
            >
              Delete Tag
              <Trash2Icon />
            </button>
            <Link
              className='dsy-btn dsy-btn-secondary dsy-btn-sm'
              to='/tags/$tagId/tasks/add'
              params={{ tagId }}
              activeProps={{ className: 'dsy-btn-active' }}
            >
              Add Task
              <ListPlusIcon />
            </Link>
            <Link
              className='dsy-btn dsy-btn-primary dsy-btn-sm'
              to='/tags/$tagId/tasks'
              params={{ tagId }}
              activeOptions={{ exact: true }}
              activeProps={{ className: 'dsy-btn-active' }}
            >
              {tag._count.tasks} Tasks
              <EyeIcon />
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </section>
  );
}
