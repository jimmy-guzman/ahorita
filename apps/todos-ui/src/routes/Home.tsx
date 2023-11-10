import { Link } from '@tanstack/react-router';

export default function Home() {
  return (
    <main>
      <div className='daisy-hero -mt-16 min-h-screen'>
        <div className='daisy-hero-content'>
          <div className='flex flex-col gap-4'>
            <span className='text-gray-500'>
              "Ahorita" translates to now in Spanish and it was used when we
              weren't really going{' '}
              <strong className='text-accent'>to do</strong> something in my
              family.
            </span>
            <h1 className='from-primary to-secondary bg-gradient-to-r bg-clip-text text-8xl font-bold text-transparent'>
              Ahorita
            </h1>
            <p className='text-2xl'>
              Another task management application built for the sake of playing
              with new technologies.
            </p>
            <div className='flex justify-end'>
              <Link to='/tasks' className='daisy-btn daisy-btn-primary'>
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
