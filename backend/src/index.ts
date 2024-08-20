import cors from "@elysiajs/cors";
import { opentelemetry } from "@elysiajs/opentelemetry";
import swagger from "@elysiajs/swagger";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { Elysia } from "elysia";
import { cyan } from "picocolors";

import env from "./env";
import { authRoutes } from "./routes/auth";
import { metadataRoutes } from "./routes/metadata";
import { projectsRoutes } from "./routes/projects";
import { tasksRoutes } from "./routes/tasks";
import { usersRoutes } from "./routes/users";

const app = new Elysia()
  .use(
    opentelemetry({
      serviceName: "ahorita",
      spanProcessors: [
        new BatchSpanProcessor(
          new OTLPTraceExporter({
            url: env.AXIOM_HOST,
            headers: {
              Authorization: `Bearer ${env.AXIOM_TOKEN}`,
              "X-Axiom-Dataset": env.AXIOM_DATASET,
            },
          }),
        ),
      ],
    }),
  )
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
    // biome-ignore lint/nursery/noConsole: elysia does not provide a logger
    console.log(`🚀 Running at ${cyan(url.toString())}`);
  });

export type App = typeof app;
