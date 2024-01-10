import { getTasks } from '@/lib/api';

export const loader = async () => {
  const data = await getTasks();

  return data;
};
