import { useMutation, useQueryClient } from '@tanstack/react-query';

import { patchTaskTags } from '../../lib/api';

export const useEditTaskTags = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['EDIT_TASK_TAGS'],
    mutationFn: patchTaskTags,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
