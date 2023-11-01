import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

const app = new Elysia()
  .use(swagger())
  .use(cors())
  .get('/', () => ({ message: 'Welcome! 👋' as const }))
  .listen(3000, ({ hostname, port }) => {
    console.log(`🚀 Running at http://${hostname}:${port}/swagger`);
  });

export type App = typeof app;
