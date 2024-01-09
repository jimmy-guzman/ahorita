import { typeboxResolver } from '@hookform/resolvers/typebox';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { createTag } from '@/lib/api';

const schema = Type.Object({
  name: Type.String({ minLength: 1, message: 'testing' }),
  description: Type.String({ minLength: 1 }),
});

export const useAddTagFormHooks = () => {
  const queryClient = useQueryClient();

  const form = useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: '',
    },
  });

  const mutation = useMutation({
    mutationKey: ['ADD_TAG'],
    mutationFn: createTag,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['tags'] });
    },
    onSuccess: async ({ name }) => {
      await queryClient.invalidateQueries({ queryKey: ['tags'] });

      toast.success(`Created new tag: ${name}`);
      form.reset();
    },
  });

  return { form, mutation };
};
