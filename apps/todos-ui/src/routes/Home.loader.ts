import { App } from 'todos-api';
import { edenFetch } from '@elysiajs/eden';

const fetch = edenFetch<App>('http://localhost:3000');

export async function loader() {
  const message = await fetch('/', {});
  return message.data;
}
