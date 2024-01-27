import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Api } from '@/api/client';
import { api } from '@/api/client';

import { tagsQueryOptions } from './useQueryTags';

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      params,
      body,
    }: Pick<Api['/tasks/:id']['patch'], 'body' | 'params'>) => {
      const res = await api.tasks[params.id as ':id'].patch(body);

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
