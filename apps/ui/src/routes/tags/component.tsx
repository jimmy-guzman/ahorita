import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet } from '@tanstack/react-router';
import { ExternalLinkIcon, ListPlusIcon, MenuIcon } from 'lucide-react';

import { tagsQueryOptions } from '@/hooks/api/useQueryTags';

// eslint-disable-next-line max-lines-per-function
export default function Tags() {
  const { data: tags } = useSuspenseQuery(tagsQueryOptions);

  return (
    <div className='dsy-drawer lg:dsy-drawer-open'>
      <input id='my-drawer-3' type='checkbox' className='dsy-drawer-toggle' />
      <div className='dsy-drawer-content flex flex-col'>
        <div className='max-w-[100vw] px-6 pb-16 xl:pr-2'>
          <nav className='dsy-navbar w-full'>
            <div className='flex-none lg:hidden'>
              <label
                htmlFor='my-drawer-3'
                aria-label='open sidebar'
                className='dsy-btn dsy-btn-square dsy-btn-ghost'
              >
                <MenuIcon className='inline-block h-6 w-6 stroke-current' />
              </label>
            </div>
            <Link
              to='/'
              className='dsy-btn dsy-btn-ghost from-primary to-secondary bg-gradient-to-r bg-clip-text text-lg normal-case text-transparent md:text-3xl lg:hidden'
            >
              ahorita
            </Link>
            <div className='dsy-navbar-start hidden lg:flex' />
            <div className='dsy-navbar-end'>
              <a
                className='dsy-btn dsy-btn-ghost dsy-btn-xs lg:dsy-btn-md'
                href={`${import.meta.env.VITE_AHORITA_API_ORIGIN}/docs`}
                target='__blank'
              >
                API Docs <ExternalLinkIcon className='h-4 w-4 lg:h-4 lg:w-4' />
              </a>
            </div>
          </nav>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
      <aside className='dsy-drawer-side'>
        <label
          htmlFor='my-drawer-3'
          aria-label='close sidebar'
          className='dsy-drawer-overlay'
        />
        <div className='bg-base-100'>
          <Link
            to='/'
            className='dsy-btn dsy-btn-ghost from-primary to-secondary dsy-btn-lg hidden bg-gradient-to-r bg-clip-text text-lg normal-case text-transparent md:text-3xl lg:flex'
          >
            ahorita
          </Link>
          <ul className='dsy-menu bg-base-100 h-dvh w-56'>
            <li className='dsy-menu-title text-primary uppercase'>Tags</li>
            <li>
              <Link to='/tags/add' activeProps={{ className: 'dsy-active' }}>
                Add New <ListPlusIcon className='text-accent h-5 w-5' />
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
        </div>
      </aside>
    </div>
  );
}
