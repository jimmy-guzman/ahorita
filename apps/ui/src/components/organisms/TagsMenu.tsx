import { useSuspenseQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';
import { PlusCircleIcon } from 'lucide-react';

import { tagsQueryOptions } from '@/hooks/api/useQueryTags';

export const TagsMenu = () => {
  const { data: tags } = useSuspenseQuery(tagsQueryOptions);

  return (
    <ul className='dsy-menu bg-base-100 h-dvh w-56'>
      <h2 className='dsy-menu-title uppercase'>Tags</h2>
      <li>
        <Link to='/tags/add' activeProps={{ className: 'dsy-active' }}>
          Add New <PlusCircleIcon className='h-5 w-5' />
        </Link>
      </li>
      {tags.map(({ id: tagId, name }) => (
        <li key={tagId}>
          <Link
            to='/tags/$tagId'
            params={{ tagId }}
            activeProps={{ className: 'dsy-active' }}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
