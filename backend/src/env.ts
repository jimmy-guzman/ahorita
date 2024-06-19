import { type Static, t } from "elysia";
import { envSchema } from "env-schema";

const schema = t.Object({
  PORT: t.Number({ default: 3000 }),
  DATABASE_URL: t.String(),
  TURSO_AUTH_TOKEN: t.String(),
  QUERY_LOGGING: t.Boolean({ default: false }),
});

type Schema = Static<typeof schema>;

export default envSchema<Schema>({
  schema,
});
