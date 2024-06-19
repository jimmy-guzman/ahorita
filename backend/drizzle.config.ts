import type { Config } from "drizzle-kit";
import env from "./src/env";

export default {
  schema: "./src/schemas",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
} satisfies Config;
