import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTaskByTagId } from '@/api/tags';

import { tagQueryOptions } from './useTag';

export const useAddTaskByTagId = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTaskByTagId,
    onMutate: async ({ params: { id } }) => {
      await queryClient.cancelQueries(tagQueryOptions(id));
    },
    onSuccess: async (_response, { params: { id } }) => {
      await queryClient.invalidateQueries(tagQueryOptions(id));
    },
  });
};
