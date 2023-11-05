import { edenFetch } from '@elysiajs/eden';
import { App } from 'todos-api';

const fetch = edenFetch<App>('http://localhost:3000');

export async function loader() {
  const response = await fetch('/tasks', {
    method: 'GET',
  });

  return response.data ?? [];
}
