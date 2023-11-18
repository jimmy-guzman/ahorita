import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { tags } from './routes/tags';
import { tasks } from './routes/tasks';

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      documentation: {
        info: { title: 'Ahorita API Docs', version: '', description: '' },
      },
      exclude: ['/'],
    })
  )
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = error.status;

      return { status: error.status, code, message: error.message };
    }
  })
  .use(tasks)
  .use(tags)
  .listen(3000, ({ hostname, port }) => {
    console.log(`🚀 Running at http://${hostname}:${port}/swagger`);
  });

export type App = typeof app;
