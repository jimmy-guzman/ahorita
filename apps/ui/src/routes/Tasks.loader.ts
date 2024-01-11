import { getTasks } from '@/api/tasks';

export const loader = async () => {
  const data = await getTasks();

  return data;
};
