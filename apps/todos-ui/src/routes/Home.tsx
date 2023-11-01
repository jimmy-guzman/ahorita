import { route } from './Home.route';

export default function Home() {
  const data = route.useLoader();

  return (
    <main className='prose lg:prose-xl daisy-prose'>
      <h1>{data?.message}</h1>
    </main>
  );
}
