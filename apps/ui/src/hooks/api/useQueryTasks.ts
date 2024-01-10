import { queryOptions } from '@tanstack/react-query';

import { getTasks } from '@/lib/api';

export const tasksQueryOptions = queryOptions({
  queryKey: ['tasks'] as const,
  queryFn: () => getTasks(),
});
