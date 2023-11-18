import { edenFetch } from '@elysiajs/eden';
import type { App } from 'todos-api';

const fetch = edenFetch<App>('http://localhost:3000');

type Schema = App['schema'];

export const patchTask = async ({
  params,
  body,
}: {
  body: Schema['/tasks/:id']['patch']['body'];
  params: Schema['/tasks/:id']['patch']['params'];
}) => {
  const response = await fetch('/tasks/:id', {
    method: 'PATCH',
    params,
    body,
  });

  if (response.error) {
    throw new Error(response.error.value);
  }

  return response.data;
};

export const deleteTask = async ({
  id,
}: Schema['/tasks/:id']['delete']['params']) => {
  const response = await fetch('/tasks/:id', {
    method: 'DELETE',
    params: { id },
  });

  if (response.error) {
    throw new Error(response.error.value);
  }

  return response.data;
};

export const createTodos = async (body: Schema['/tasks']['post']['body']) => {
  const response = await fetch('/tasks', {
    method: 'POST',
    body,
  });

  if (response.error) {
    throw new Error(response.error.value);
  }

  return response.data;
};

export type Task = Schema['/tasks']['get']['response'][200][number];

export const getTodos = async () => {
  const response = await fetch('/tasks', { method: 'GET' });

  if (response.error) {
    throw new Error(response.error.value);
  }

  return response.data;
};

export const getTodo = async (
  params: Schema['/tasks/:id']['get']['params']
) => {
  const response = await fetch('/tasks/:id', { method: 'GET', params });

  if (response.error) {
    throw new Error(response.error.value);
  }

  return response.data;
};

export const getTags = async () => {
  const response = await fetch('/tags', { method: 'GET' });

  if (response.error) {
    throw new Error(response.error.value);
  }

  return response.data;
};

export const patchTaskTags = async ({
  params,
  body,
}: {
  body: Schema['/tasks/:id/tags']['patch']['body'];
  params: Schema['/tasks/:id/tags']['patch']['params'];
}) => {
  const response = await fetch('/tasks/:id/tags', {
    method: 'PATCH',
    body,
    params,
  });

  if (response.error) {
    throw new Error(response.error.value);
  }

  return response.data;
};
