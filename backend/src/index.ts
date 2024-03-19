import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cyan } from "picocolors";

import { authRoutes } from "./routes/auth";
import { projectsRoutes } from "./routes/projects";
import { tasksRoutes } from "./routes/tasks";
import { usersRoutes } from "./routes/users";

const app = new Elysia()
  .use(
    cors({
      methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
      allowedHeaders: ["Content-Type"],
      // TODO: revisit when https://github.com/elysiajs/elysia-cors/issues/41 is addressed
      origin: /localhost.*/,
    }),
  )
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: { title: "Ahorita API Docs", version: "", description: "" },
        tags: [
          { description: "Everything about your Projects", name: "Project" },
          { description: "Everything about your Tasks", name: "Task" },
        ],
      },
      exclude: ["/docs", "/docs/json"],
    }),
  )
  .use(authRoutes)
  .use(projectsRoutes)
  .use(tasksRoutes)
  .use(usersRoutes)
  .listen(3000, ({ hostname, port }) => {
    // biome-ignore lint/suspicious/noConsoleLog: elysia does not provide a logger
    console.log(`🚀 Running at ${cyan(`http://${hostname}:${port}/docs`)}`);
  });

export type App = typeof app;
