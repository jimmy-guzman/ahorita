import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchTask } from '@/api/tasks';

import { tasksQueryOptions } from './useQueryTasks';

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchTask,
    onMutate: async () => {
      await queryClient.cancelQueries(tasksQueryOptions);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tasksQueryOptions);
    },
  });
};
