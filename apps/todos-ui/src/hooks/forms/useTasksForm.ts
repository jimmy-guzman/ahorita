import { typeboxResolver } from '@hookform/resolvers/typebox';
import { Static, Type } from '@sinclair/typebox';
import { useController, useForm, useFormContext } from 'react-hook-form';

import { Task } from '../../lib/api';

const schema = Type.Object({
  tasks: Type.Array(
    Type.Object({
      name: Type.String({ minLength: 1 }),
      tags: Type.Array(
        Type.Object({ id: Type.String(), name: Type.String({ minLength: 1 }) })
      ),
      createdAt: Type.String(),
      updatedAt: Type.String(),
      completed: Type.Boolean(),
      id: Type.String(),
    })
  ),
});

type FormValues = Static<typeof schema>;

export const useTasksFormContext = useFormContext<FormValues>;

export const useTasksForm = (tasks: Task[] = []) => {
  return useForm<FormValues>({
    resolver: typeboxResolver(schema),
    values: { tasks },
  });
};

export const useTasksFormField = useController<FormValues>;
