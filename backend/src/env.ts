import { type Static, t } from "elysia";
import { envSchema } from "env-schema";

const schema = t.Object({
  PORT: t.Number({ default: 3000 }),
  DATABASE_URL: t.String(),
  TURSO_AUTH_TOKEN: t.String(),
  QUERY_LOGGING: t.Boolean({ default: true }),
  OTEL_SDK_DISABLED: t.Boolean({ default: true }),
  AXIOM_HOST: t.Optional(
    t.String({ default: "https://api.axiom.co/v1/traces" }),
  ),
  AXIOM_TOKEN: t.Optional(t.String()),
  AXIOM_DATASET: t.Optional(t.String()),
});

type Schema = Static<typeof schema>;

export default envSchema<Schema>({
  schema,
});
