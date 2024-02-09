import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";

import * as schema from "./schema";

const sqlite = new Database(Bun.env.DATABASE_URL);

export const db = drizzle(sqlite, {
	schema,
	logger: Bun.env.QUERY_LOGGING === "true",
});
