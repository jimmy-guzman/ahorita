import { relations } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";
import { projects, tasks } from "./projects";

export const users = sqliteTable("user", (t) => ({
  id: t.text().notNull().primaryKey(),
  username: t.text().unique(),
  password: t.text().notNull(),
}));

export const usersRelations = relations(users, ({ many }) => ({
  session: many(sessions),
  projects: many(projects),
  tasks: many(tasks),
}));

export const sessions = sqliteTable("session", (t) => ({
  id: t.text().notNull().primaryKey(),
  userId: t
    .text()
    .notNull()
    .references(() => users.id),
  expiresAt: t.integer().notNull(),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
