import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTag } from '@/api/tags';

import { tagsQueryOptions } from './useQueryTags';
import { tagQueryOptions } from './useTag';

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTag,
    onMutate: async () => {
      await queryClient.cancelQueries(tagsQueryOptions);
    },
    onSuccess: async (_response, { params: { id } }) => {
      queryClient.removeQueries(tagQueryOptions(id));
      await queryClient.invalidateQueries(tagsQueryOptions);
    },
  });
};
