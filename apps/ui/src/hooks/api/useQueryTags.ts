import { queryOptions } from '@tanstack/react-query';

import { getTags } from '@/lib/api';

export const tagsQueryOptions = queryOptions({
  queryKey: ['tags'] as const,
  queryFn: () => getTags(),
});
