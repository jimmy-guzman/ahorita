import { useMutation, useQueryClient } from '@tanstack/react-query';

import { api } from '@/api/client';

import { tagsQueryOptions } from './useQueryTags';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.tasks[id as ':id'].delete();

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
    onMutate: async () => {
      await queryClient.cancelQueries(tagsQueryOptions);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tagsQueryOptions);
    },
  });
};
