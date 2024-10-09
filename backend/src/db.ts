import { drizzle } from "drizzle-orm/connect";

import env from "./env";
import * as schema from "./schemas";

export const db = await drizzle("turso", {
  connection: {
    url: env.DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  casing: "snake_case",
  logger: env.QUERY_LOGGING,
  schema,
});
