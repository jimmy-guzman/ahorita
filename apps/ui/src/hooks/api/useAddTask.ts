import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTaskByTagId } from '@/api/tags';
import { createTasks } from '@/api/tasks';
import { tasksQueryOptions } from '@/hooks/api/useQueryTasks';

import { tagQueryOptions } from './useTag';

export const useAddTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTasks,
    onMutate: async () => {
      await queryClient.cancelQueries(tasksQueryOptions());
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(tasksQueryOptions());
    },
  });
};

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
