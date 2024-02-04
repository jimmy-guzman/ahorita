import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { Link, useNavigate } from '@tanstack/react-router';
import { getRouteApi } from '@tanstack/react-router';
import { EyeIcon, ListPlusIcon, Trash2Icon } from 'lucide-react';

import { deleteTagMutationOptions } from '@/api/deleteTag';
import { tagQueryOptions } from '@/api/queryTag';

const routeApi = getRouteApi('/tags/$tagId');

export const TagCard = () => {
  const { tagId } = routeApi.useParams();
  const { data: tag } = useSuspenseQuery(tagQueryOptions(tagId));
  const { mutate, isPending } = useMutation(deleteTagMutationOptions);
  const navigate = useNavigate();

  return (
    <div className='dsy-card bg-base-200'>
      <div className='dsy-card-body'>
        <h1 className='dsy-card-title text-secondary'>{tag.name}</h1>
        <p>{tag.description}</p>
        <div className='dsy-card-actions justify-end'>
          <button
            className='dsy-btn dsy-btn-sm dsy-btn-neutral'
            disabled={isPending}
            onClick={() => {
              mutate(tagId, {
                onSuccess() {
                  return navigate({ to: '/tags/add' });
                },
              });
            }}
          >
            Delete Tag <Trash2Icon />
          </button>
          <Link
            className='dsy-btn dsy-btn-secondary dsy-btn-sm'
            to='/tags/$tagId/add-task'
            params={{ tagId }}
            activeProps={{ className: 'dsy-btn-active' }}
          >
            Add Task <ListPlusIcon />
          </Link>
          <Link
            className='dsy-btn dsy-btn-primary dsy-btn-sm'
            to='/tags/$tagId/tasks'
            params={{ tagId }}
            activeOptions={{ exact: true }}
            activeProps={{ className: 'dsy-btn-active' }}
          >
            {tag._count.tasks} Tasks <EyeIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};