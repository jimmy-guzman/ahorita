import { typeboxResolver } from '@hookform/resolvers/typebox';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { useForm } from 'react-hook-form';

const schema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export type AddTaskFormValues = Static<typeof schema>;

export const useAddTaskForm = () => {
  return useForm<AddTaskFormValues>({
    resolver: typeboxResolver(schema),
    defaultValues: {
      name: '',
    },
  });
};
