import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { Api } from '@/api/client';
import { api } from '@/api/client';
import { tagsQueryOptions } from '@/hooks/api/useQueryTags';

export const useAddTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: Api['/tags']['post']['body']) => {
      const res = await api.tags.post(body);

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
