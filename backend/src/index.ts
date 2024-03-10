import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cyan } from "picocolors";

import { authRoutes } from "./routes/auth";
import { groupsRoute } from "./routes/groups";
import { tasksRoutes } from "./routes/tasks";
import { usersRoutes } from "./routes/users";

const app = new Elysia()
  .use(
    cors({
      methods: ["GET", "POST", "PATCH", "DELETE"],
      allowedHeaders: "content-type",
    }),
  )
  .use(
    swagger({
      path: "/docs",
      documentation: {
        info: { title: "Ahorita API Docs", version: "", description: "" },
      },
      exclude: ["/docs", "/docs/json"],
    }),
  )
  .use(authRoutes)
  .use(tasksRoutes)
  .use(groupsRoute)
  .use(usersRoutes)
  .listen(3000, ({ hostname, port }) => {
    console.log(`🚀 Running at ${cyan(`http://${hostname}:${port}/docs`)}`);
  });

export type App = typeof app;
