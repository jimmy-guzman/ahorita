import { typeboxResolver } from '@hookform/resolvers/typebox';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { useForm } from 'react-hook-form';

const schema = Type.Object({
  name: Type.String({ minLength: 1, message: 'testing' }),
  description: Type.String({ minLength: 1 }),
});

export const useAddTagForm = () => {
  return useForm<Static<typeof schema>>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: '',
      description: '',
    },
  });
};
