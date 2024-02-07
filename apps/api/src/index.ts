import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { cyan } from 'picocolors';

import { tagsRoute } from './routes/tags';
import { tasksRoutes } from './routes/tasks';

const app = new Elysia()
  // @ts-expect-error TODO: remove once @elysiajs/eden is bumped
  .use(cors({ methods: ['GET', 'POST', 'PATCH', 'DELETE'] }))
  .use(
    swagger({
      path: '/docs',
      documentation: {
        info: { title: 'Ahorita API Docs', version: '', description: '' },
      },
      exclude: ['/docs', '/docs/json'],
    })
  )
  .onError(({ code, error, set }) => {
    if (code === 'NOT_FOUND') {
      set.status = error.status;

      return { status: error.status, code, message: error.message };
    }

    return undefined;
  })
  .use(tasksRoutes)
  .use(tagsRoute)
  .listen(3000, ({ hostname, port }) => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Running at ${cyan(`http://${hostname}:${port}/docs`)}`);
  });

export type App = typeof app;
