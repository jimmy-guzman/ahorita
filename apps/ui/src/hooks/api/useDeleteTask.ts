import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTask } from '@/api/tasks';

import { tasksQueryOptions } from './useQueryTasks';

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTask,
    onMutate: async () => {
      await queryClient.cancelQueries(tasksQueryOptions);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tasksQueryOptions);
    },
  });
};
