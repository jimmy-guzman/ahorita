import { opentelemetry as otel } from "@elysiajs/opentelemetry";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { Elysia } from "elysia";

import env from "../env";

export const opentelemetry = new Elysia().use(
  otel({
    serviceName: "ahorita",
    spanProcessors: [
      new BatchSpanProcessor(
        new OTLPTraceExporter(
          env.AXIOM_DATASET && env.AXIOM_TOKEN && env.AXIOM_HOST
            ? {
                url: env.AXIOM_HOST,
                headers: {
                  Authorization: `Bearer ${env.AXIOM_TOKEN}`,
                  "X-Axiom-Dataset": env.AXIOM_DATASET,
                },
              }
            : undefined,
        ),
      ),
    ],
  }),
);
