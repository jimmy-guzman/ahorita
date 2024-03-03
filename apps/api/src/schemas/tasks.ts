import { relations, sql } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { nanoid } from "../utils";
import { users } from "./users";

const statuses = <const>["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELED"];

const priorities = <const>["LOW", "MEDIUM", "HIGH"];

export const groups = pgTable("group", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),

  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const tasks = pgTable("task", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").notNull(),
  status: text("status", { enum: statuses }).default("TODO").notNull(),
  priority: text("priority", { enum: priorities }).default("MEDIUM").notNull(),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "string",
  })
    .defaultNow()
    .notNull(),
  dueAt: timestamp("due_at", {
    withTimezone: true,
    mode: "string",
  })
    .default(sql`now() + INTERVAL '1 MONTHS'`)
    .notNull(),

  groupId: text("group_id")
    .references(() => groups.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  group: one(groups, {
    fields: [tasks.groupId],
    references: [groups.id],
  }),
}));
