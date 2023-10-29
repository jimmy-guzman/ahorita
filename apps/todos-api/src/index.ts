import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

const app = new Elysia();

app
  .use(swagger())
  .get('/', () => 'Hello Elysia')
  .listen(3000, ({ hostname, port }) => {
    console.log(`🚀 Running at http://${hostname}:${port}/swagger`);
  });
