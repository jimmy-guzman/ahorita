import type { App } from '@ahorita/api';
import { edenFetch } from '@elysiajs/eden';

const fetch = edenFetch<App>('http://localhost:3000');

type Schema = App['schema'];

export const patchTask = async ({
  params,
  body,
}: {
  body: Schema['/tasks/:id']['patch']['body'];
  params: Schema['/tasks/:id']['patch']['params'];
}) => {
  const { error, data } = await fetch('/tasks/:id', {
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
  id,
}: Schema['/tasks/:id']['delete']['params']) => {
  const { error, data } = await fetch('/tasks/:id', {
    method: 'DELETE',
    params: { id },
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const createTodos = async (body: Schema['/tasks']['post']['body']) => {
  const { error, data } = await fetch('/tasks', {
    method: 'POST',
    body,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export type Task = Schema['/tasks']['get']['response'][200][number];

export const getTodos = async () => {
  const { error, data } = await fetch('/tasks', { method: 'GET' });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const getTodo = async (
  params: Schema['/tasks/:id']['get']['params']
) => {
  const { error, data } = await fetch('/tasks/:id', { method: 'GET', params });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export type Tag = Schema['/tags']['get']['response'][200][number];

export const getTags = async () => {
  const { error, data } = await fetch('/tags', { method: 'GET' });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const patchTaskTags = async ({
  params,
  body,
}: {
  body: Schema['/tasks/:id/tags']['patch']['body'];
  params: Schema['/tasks/:id/tags']['patch']['params'];
}) => {
  const { error, data } = await fetch('/tasks/:id/tags', {
    method: 'PATCH',
    body,
    params,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};

export const createTag = async (body: Schema['/tags']['post']['body']) => {
  const { error, data } = await fetch('/tags', {
    method: 'POST',
    body,
  });

  if (error) {
    throw new Error(error.value);
  }

  return data;
};
