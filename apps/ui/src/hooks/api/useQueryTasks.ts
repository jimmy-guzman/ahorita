import { queryOptions } from '@tanstack/react-query';

import { getTasks } from '@/api/tasks';

export const tasksQueryOptions = queryOptions({
  queryKey: ['tasks'] as const,
  queryFn: () => getTasks(),
});
