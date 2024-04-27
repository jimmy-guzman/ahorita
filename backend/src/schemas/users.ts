import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { projects, tasks } from "./projects";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").unique(),
  password: text("password").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  session: many(sessions),
  projects: many(projects),
  tasks: many(tasks),
}));

export const sessions = pgTable("session", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
