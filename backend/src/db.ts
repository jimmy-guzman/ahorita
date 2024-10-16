import { drizzle } from "drizzle-orm/libsql";

import env from "./env";
import * as schema from "./schemas";

export const db = drizzle({
  connection: {
    url: env.DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  casing: "snake_case",
  logger: env.QUERY_LOGGING,
  schema,
});
