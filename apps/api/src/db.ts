import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schemas";

if (!Bun.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

export const sql = neon<boolean, boolean>(Bun.env.DATABASE_URL);

export const db = drizzle(sql, {
  logger: Bun.env.QUERY_LOGGING === "true",
  schema,
});
