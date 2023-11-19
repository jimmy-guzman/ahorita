import { typeboxResolver } from '@hookform/resolvers/typebox';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { createTodos } from '@/lib/api';

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export const useAddTaskFormHooks = () => {
  const queryClient = useQueryClient();

  const form = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useMutation({
    mutationKey: ['ADD_TASK'],
    mutationFn: createTodos,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });
    },
    onSuccess: async ({ name }) => {
      await queryClient.invalidateQueries({ queryKey: ['tasks'] });

      toast.success(`Created new task: ${name}`);
      form.reset();
    },
  });

  return { form, mutation };
};
