import { queryOptions } from '@tanstack/react-query';

import { getTags } from '@/api/tags';

export const tagsQueryOptions = queryOptions({
  queryKey: ['tags'] as const,
  queryFn: () => getTags(),
});
