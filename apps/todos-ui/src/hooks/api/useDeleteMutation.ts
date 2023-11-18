import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTask } from '@/lib/api';

export const useDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['DELETE_TASK'],
    mutationFn: deleteTask,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
