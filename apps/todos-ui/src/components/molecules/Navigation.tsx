import { Link } from '@tanstack/react-router';

export const Navigation = () => {
  return (
    <div className='daisy-navbar bg-base-100'>
      <Link to='/' className='daisy-btn daisy-btn-ghost text-xl normal-case'>
        ahorita
      </Link>
    </div>
  );
};
