import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTag } from '@/api/tags';
import { tagsQueryOptions } from '@/hooks/api/useQueryTags';

export const useAddTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTag,
    onMutate: async () => {
      await queryClient.cancelQueries(tagsQueryOptions);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tagsQueryOptions);
    },
  });
};
