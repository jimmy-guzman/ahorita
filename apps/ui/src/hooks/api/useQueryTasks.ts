import { queryOptions } from '@tanstack/react-query';

import { getTasks } from '@/api/tasks';

export const tasksQueryOptions = () => {
  return queryOptions({
    queryKey: ['tasks'] as const,
    queryFn: () => getTasks(),
  });
};
