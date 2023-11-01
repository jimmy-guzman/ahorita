import { edenFetch } from '@elysiajs/eden';
import { App } from 'todos-api';

const fetch = edenFetch<App>('http://localhost:3000');

export async function loader() {
  const message = await fetch('/', {});
  return message.data;
}
