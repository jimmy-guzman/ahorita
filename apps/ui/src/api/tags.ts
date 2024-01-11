import type { Schema } from './ahorita';
import { ahoritaFetch } from './ahorita';

export const getTags = async () => {
  const { error, data } = await ahoritaFetch('/tags', { method: 'GET' });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export type Tag = Awaited<ReturnType<typeof getTags>>[number];

export const createTag = async ({
  body,
}: Pick<Schema['/tags']['post'], 'body'>) => {
  const { error, data } = await ahoritaFetch('/tags', {
    method: 'POST',
    body,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};
