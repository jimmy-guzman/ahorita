import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schemas",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
} satisfies Config;
