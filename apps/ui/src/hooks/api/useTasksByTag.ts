import { queryOptions } from '@tanstack/react-query';

import { getTasksByTagId } from '@/api/tags';

export const tasksByTagQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['tags', id, 'tasks'] as const,
    queryFn: () => getTasksByTagId({ params: { id } }),
  });
};
