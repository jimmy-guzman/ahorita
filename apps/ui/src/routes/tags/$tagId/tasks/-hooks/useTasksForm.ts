import { typeboxResolver } from '@hookform/resolvers/typebox';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import { useForm, useFormContext } from 'react-hook-form';

const schema = Type.Object({
  tasks: Type.Array(
    Type.Object({
      name: Type.String({ minLength: 1 }),
      createdAt: Type.String(),
      updatedAt: Type.String(),
      completed: Type.Boolean(),
      id: Type.String(),
      tagId: Type.String(),
    })
  ),
});

type FormValues = Static<typeof schema>;

export const useTasksFormContext = useFormContext<FormValues>;

export const useTasksForm = (tasks: FormValues['tasks'] = []) => {
  return useForm<FormValues>({
    resolver: typeboxResolver(schema),
    values: { tasks },
  });
};
