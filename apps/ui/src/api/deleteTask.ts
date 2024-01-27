import { api } from '@/api/client';
import { mutationOptions } from '@/api/mutationOptions';
import { queryClient } from '@/queryClient';

import { tagsQueryOptions } from './queryTags';

export const deleteTaskMutationOptions = mutationOptions({
  mutationFn: async (id: string) => {
    const res = await api.tasks[id as ':id'].delete();

    if (res.error) throw new Error(res.error.value);

    return res.data;
  },
  onMutate: async () => {
    await queryClient.cancelQueries(tagsQueryOptions);
  },
  onSuccess: async () => {
    await queryClient.invalidateQueries(tagsQueryOptions);
  },
});
