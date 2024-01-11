import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createTasks } from '@/api/tasks';
import { tasksQueryOptions } from '@/hooks/api/useQueryTasks';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTasks,
    onMutate: async () => {
      await queryClient.cancelQueries(tasksQueryOptions);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tasksQueryOptions);
    },
  });
};
