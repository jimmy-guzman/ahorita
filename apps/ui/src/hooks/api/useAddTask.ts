import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Api } from '@/api/client';
import { api } from '@/api/client';

import { tagQueryOptions } from './useTag';

export const useAddTaskByTagId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      params,
      body,
    }: Pick<Api['/tags/:id/tasks']['post'], 'body' | 'params'>) => {
      const res = await api.tags[params.id as ':id'].tasks.post(body);

      if (res.error) throw new Error(res.error.value);

      return res.data;
    },
    onMutate: async ({ params: { id } }) => {
      await queryClient.cancelQueries(tagQueryOptions(id));
    },
    onSuccess: async (_response, { params: { id } }) => {
      await queryClient.invalidateQueries(tagQueryOptions(id));
    },
  });
};
