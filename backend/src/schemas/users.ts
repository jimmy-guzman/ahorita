import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { projects, tasks } from "./projects";

export const users = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").unique(),
  password: text("password").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  session: many(sessions),
  projects: many(projects),
  tasks: many(tasks),
}));

export const sessions = sqliteTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
