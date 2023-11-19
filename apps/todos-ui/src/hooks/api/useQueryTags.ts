import { useQuery } from '@tanstack/react-query';

import type { Tag } from '@/lib/api';
import { getTags } from '@/lib/api';

export const useQueryTags = <TData = Tag[]>(
  select?: (data: Tag[]) => TData
) => {
  return useQuery({ queryKey: ['tags'], queryFn: getTags, select });
};
