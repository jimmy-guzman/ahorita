import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import env from "./env";
import * as schema from "./schemas";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, {
  logger: env.QUERY_LOGGING,
  schema,
});
