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

export const getTag = async ({
  params,
}: Pick<Schema['/tags/:id']['get'], 'params'>) => {
  const { error, data } = await ahoritaFetch('/tags/:id', {
    method: 'GET',
    params,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const deleteTag = async ({
  params,
}: Pick<Schema['/tags/:id']['delete'], 'params'>) => {
  const { error, data } = await ahoritaFetch('/tags/:id', {
    method: 'DELETE',
    params,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const getTasksByTagId = async ({
  params,
}: Pick<Schema['/tags/:id/tasks']['get'], 'params'>) => {
  const { error, data } = await ahoritaFetch('/tags/:id/tasks', {
    method: 'GET',
    params,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const addTaskByTagId = async ({
  params,
  body,
}: Pick<Schema['/tags/:id/tasks']['post'], 'params' | 'body'>) => {
  const { error, data } = await ahoritaFetch('/tags/:id/tasks', {
    method: 'POST',
    params,
    body,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};
