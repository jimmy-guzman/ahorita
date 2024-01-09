import { getTodos } from '@/lib/api';

export const loader = async () => {
  const data = await getTodos();

  return data;
};
