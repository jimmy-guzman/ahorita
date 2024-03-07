import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { groups, tasks } from "./tasks";

export const users = pgTable("user", {
  id: text("id").notNull().primaryKey(),
  username: text("username").unique(),
  password: text("password").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  session: many(sessions),
  groups: many(groups),
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
