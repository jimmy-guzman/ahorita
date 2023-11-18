import { Link } from '@tanstack/react-router';
import { MenuIcon } from 'lucide-react';

const routes = [
  { to: '/tasks' as const, name: 'Tasks' },
  { to: '/tags' as const, name: 'Tags' },
];

export const Navigation = () => {
  return (
    <div className='dsy-navbar bg-base-100'>
      <div className='dsy-navbar-start'>
        <div className='dsy-dropdown'>
          <label tabIndex={0} className='btn btn-ghost lg:hidden'>
            <MenuIcon className='h-5 w-5' />
          </label>
          <ul
            tabIndex={0}
            className='dsy-menu dsy-menu-sm dsy-dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow'
          >
            {routes.map(({ to, name }) => (
              <li key={to}>
                <Link to={to}>{name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link
          to='/'
          className='dsy-btn dsy-btn-ghost text-primary text-xl normal-case'
        >
          ahorita 📋
        </Link>
      </div>
      <div className='dsy-navbar-center hidden lg:flex'>
        <ul className='dsy-menu dsy-menu-horizontal gap-2 px-1'>
          {routes.map(({ to, name }) => (
            <li key={to}>
              <Link to={to}>{name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='dsy-navbar-end' />
    </div>
  );
};
