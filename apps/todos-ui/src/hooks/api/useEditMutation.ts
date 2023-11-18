import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchTask } from '../../lib/api';

export const useEditMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['UPDATE_TASK'],
    mutationFn: patchTask,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
