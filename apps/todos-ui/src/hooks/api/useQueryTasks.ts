import { useQuery } from '@tanstack/react-query';

import { getTodos } from '@/lib/api';

export const useQueryTasks = () => {
  return useQuery({ queryKey: ['tasks'], queryFn: getTodos } as const);
};
