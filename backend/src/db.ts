import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

import * as schema from "./schemas";

if (!Bun.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

if (!Bun.env.TURSO_AUTH_TOKEN) {
  throw new Error("Missing TURSO_AUTH_TOKEN");
}

export const client = createClient({
  url: Bun.env.DATABASE_URL,
  authToken: Bun.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client, {
  logger: Bun.env.QUERY_LOGGING === "true",
  schema,
});
