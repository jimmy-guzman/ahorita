import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTask } from '@/api/tasks';

import { tagsQueryOptions } from './useQueryTags';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onMutate: async () => {
      await queryClient.cancelQueries(tagsQueryOptions);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tagsQueryOptions);
    },
  });
};
