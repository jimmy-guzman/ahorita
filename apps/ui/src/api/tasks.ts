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

export const createTasks = async ({
  body,
}: Pick<Schema['/tasks']['post'], 'body'>) => {
  const { error, data } = await ahoritaFetch('/tasks', {
    method: 'POST',
    body,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const getTasks = async () => {
  const { error, data } = await ahoritaFetch('/tasks', {
    method: 'GET',
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const getTask = async ({
  params,
}: Pick<Schema['/tasks/:id']['get'], 'params'>) => {
  const { error, data } = await ahoritaFetch('/tasks/:id', {
    method: 'GET',
    params,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const patchTaskTags = async ({
  params,
  body,
}: Pick<Schema['/tasks/:id/tags']['patch'], 'body' | 'params'>) => {
  const { error, data } = await ahoritaFetch('/tasks/:id/tags', {
    method: 'PATCH',
    body,
    params,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};
