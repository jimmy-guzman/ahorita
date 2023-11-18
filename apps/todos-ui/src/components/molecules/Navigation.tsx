import { Link } from '@tanstack/react-router';
import { MenuIcon } from 'lucide-react';

const routes = [
  { to: '/tasks' as const, name: 'Tasks' },
  { to: '/tags' as const, name: 'Tags' },
];

export const Navigation = () => {
  return (
    <div className='daisy-navbar bg-base-100'>
      <div className='daisy-navbar-start'>
        <div className='daisy-dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <MenuIcon className='h-5 w-5' />
          </label>
          <ul
            tabIndex={0}
            className='daisy-menu daisy-menu-sm daisy-dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {routes.map((route, i) => (
              <li key={i}>
                <Link to={route.to}>{route.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link
          to='/'
          className='daisy-btn daisy-btn-ghost text-primary text-xl normal-case'
        >
          ahorita
        </Link>
      </div>
      <div className='daisy-navbar-center hidden lg:flex'>
        <ul className='daisy-menu daisy-menu-horizontal px-1'>
          {routes.map((route, i) => (
            <li key={i}>
              <Link to={route.to}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='daisy-navbar-end' />
    </div>
  );
};
