import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/client';

import { tagsQueryOptions } from './useQueryTags';
import { tagQueryOptions } from './useTag';

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.tags[id as ':id'].delete();

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(tagsQueryOptions);
    },
    onSuccess: async (_response, id) => {
      queryClient.removeQueries(tagQueryOptions(id));
      await queryClient.invalidateQueries(tagsQueryOptions);
    },
  });
};
