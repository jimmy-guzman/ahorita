import { useSuspenseQuery } from '@tanstack/react-query';

import { AddTaskForm } from '@/components/molecules/AddTaskForm';
import { TasksTable } from '@/components/organisms/TasksTable';
import { tasksQueryOptions } from '@/hooks/api/useQueryTasks';

export default function Tasks() {
  const { data: tasks } = useSuspenseQuery(tasksQueryOptions());

  return (
    <main className='flex flex-col gap-4'>
      <div className='prose lg:prose-xl dsy-prose'>
        <h1>Tasks</h1>
      </div>
      <div className='flex justify-center gap-4'>
        <div className='basis-full md:basis-1/2'>
          <AddTaskForm />
        </div>
      </div>
      <TasksTable tasks={tasks} />
    </main>
  );
}
