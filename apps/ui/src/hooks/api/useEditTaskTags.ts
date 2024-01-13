import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchTaskTags } from '@/api/tasks';

import { tasksQueryOptions } from './useQueryTasks';

export const useEditTaskTags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTaskTags,
    onMutate: async () => {
      await queryClient.cancelQueries(tasksQueryOptions());
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tasksQueryOptions());
    },
  });
};
