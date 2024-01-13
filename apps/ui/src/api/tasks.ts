import type { Schema } from './ahorita';
import { ahoritaFetch } from './ahorita';

export const patchTask = async ({
  params,
  body,
}: Pick<Schema['/tasks/:id']['patch'], 'body' | 'params'>) => {
  const { error, data } = await ahoritaFetch('/tasks/:id', {
    method: 'PATCH',
    params,
    body,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const deleteTask = async ({
  params,
}: Pick<Schema['/tasks/:id']['delete'], 'params'>) => {
  const { error, data } = await ahoritaFetch('/tasks/:id', {
    method: 'DELETE',
    params,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};
