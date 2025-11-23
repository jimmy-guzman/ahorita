import { sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", (t) => ({
  id: t.text().notNull().primaryKey(),
  username: t.text().unique(),
  password: t.text().notNull(),
}));

export const sessions = sqliteTable("session", (t) => ({
  id: t.text().notNull().primaryKey(),
  userId: t
    .text()
    .notNull()
    .references(() => users.id),
  expiresAt: t.integer().notNull(),
}));
