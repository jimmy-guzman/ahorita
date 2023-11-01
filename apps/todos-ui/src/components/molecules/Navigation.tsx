import { Link } from '@tanstack/react-router';

export const Navigation = () => {
  return (
    <div className='daisy-navbar bg-base-100'>
      <Link to='/' className='daisy-btn daisy-btn-ghost normal-case text-xl'>
        ahorita
      </Link>
    </div>
  );
};
