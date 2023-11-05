import { TasksForm } from '../components/molecules/TasksForm';

export default function Home() {
  return (
    <main className='flex flex-col gap-4'>
      <div className='prose lg:prose-xl daisy-prose'>
        <h1>Welcome!</h1>
      </div>
      <TasksForm />
    </main>
  );
}
