import { useQuery } from '@tanstack/react-query';

import { getTags } from '@/lib/api';

export const useQueryTags = () => {
  return useQuery({ queryKey: ['tags'], queryFn: getTags });
};
