import { typeboxResolver } from '@hookform/resolvers/typebox';
import type { Static } from '@sinclair/typebox';
import { Type } from '@sinclair/typebox';
import type { FieldArrayWithId } from 'react-hook-form';
import { useForm, useFormContext } from 'react-hook-form';

const schema = Type.Object({
  tasks: Type.Array(
    Type.Object({
      name: Type.String({ minLength: 1 }),
      createdAt: Type.Date(),
      updatedAt: Type.Date(),
      completed: Type.Boolean(),
      id: Type.String(),
    })
  ),
});

type FormValues = Static<typeof schema>;

export type TaskWithId = FieldArrayWithId<FormValues, 'tasks', 'key'>;

export const useTasksFormContext = useFormContext<FormValues>;

export const useTasksForm = (tasks: FormValues['tasks'] = []) => {
  return useForm<FormValues>({
    resolver: typeboxResolver(schema),
    values: { tasks },
  });
};
