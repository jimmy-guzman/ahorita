import { AddTaskForm } from '@/components/molecules/AddTaskForm';

export default function AddTaskByTag() {
  return (
    <div className='flex w-full flex-col gap-8'>
      <div className='prose lg:prose-xl dsy-prose'>
        <h3>Add Your New Task</h3>
      </div>
      <AddTaskForm />
    </div>
  );
}
