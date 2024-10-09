import type { Config } from "drizzle-kit";
import env from "./src/env";

export default {
  schema: "./src/schemas",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  casing: "snake_case",
} satisfies Config;
