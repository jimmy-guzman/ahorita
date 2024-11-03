import cors from "@elysiajs/cors";
import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { cyan } from "picocolors";

import env from "./env";
import { opentelemetry } from "./plugins/opentelemetry";
import { authRoutes } from "./routes/auth";
import { metadataRoutes } from "./routes/metadata";
import { projectsRoutes } from "./routes/projects";
import { tasksRoutes } from "./routes/tasks";
import { usersRoutes } from "./routes/users";

const app = new Elysia()
  .use(opentelemetry)
  .use(cors())
  .use(
    swagger({
      path: "",
      documentation: {
        info: { title: "Ahorita API Docs", version: "", description: "" },
        tags: [
          { description: "Everything about your Projects", name: "Project" },
          { description: "Everything about your Tasks", name: "Task" },
        ],
      },
      exclude: ["", "/json"],
    }),
  )
  .use(authRoutes)
  .use(projectsRoutes)
  .use(tasksRoutes)
  .use(usersRoutes)
  .use(metadataRoutes)
  .listen(env.PORT, ({ url }) => {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.log(`🚀 Running at ${cyan(url.toString())}`);
  });

export type App = typeof app;
