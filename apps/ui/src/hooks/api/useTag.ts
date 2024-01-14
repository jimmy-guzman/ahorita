import { queryOptions } from '@tanstack/react-query';

import { getTag } from '@/api/tags';

export const tagQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['tags', id] as const,
    queryFn: () => getTag({ params: { id } }),
  });
};
