import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchTask } from '@/api/tasks';

import { tagsQueryOptions } from './useQueryTags';

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTask,
    onMutate: async () => {
      await queryClient.cancelQueries(tagsQueryOptions);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tagsQueryOptions);
    },
  });
};
