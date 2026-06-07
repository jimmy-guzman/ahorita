import cors from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { cyan } from "picocolors";

import env from "./env";
import { authPlugin } from "./middleware/auth";
import { opentelemetry } from "./plugins/opentelemetry";
import { metadataRoutes } from "./routes/metadata";
import { projectsRoutes } from "./routes/projects";
import { tasksRoutes } from "./routes/tasks";
import { usersRoutes } from "./routes/users";

const app = new Elysia()
  .use(opentelemetry)
  .use(
    cors({
      origin: env.CORS_ORIGIN,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(
    openapi({
      documentation: {
        info: { title: "Ahorita API Docs", version: "", description: "" },
        tags: [
          { description: "Everything about your Projects", name: "Project" },
          { description: "Everything about your Tasks", name: "Task" },
        ],
      },
      exclude: {
        paths: ["/"],
      },
    }),
  )
  .get("/", ({ redirect }) => {
    return redirect("/openapi");
  })
  .use(authPlugin)
  .use(projectsRoutes)
  .use(tasksRoutes)
  .use(usersRoutes)
  .use(metadataRoutes)

  .listen(env.PORT, ({ url }) => {
    // biome-ignore lint/suspicious/noConsole: we want to log the url
    console.log(`🚀 Running at ${cyan(url.toString())}`);
  });

export type App = typeof app;
