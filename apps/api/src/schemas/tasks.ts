import { relations, sql } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { nanoid } from "../utils";
import { users } from "./users";

const statuses = <const>["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELED"];

const priorities = <const>["LOW", "MEDIUM", "HIGH"];

export const groups = pgTable("group", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description").notNull(),
  icon: text("icon"),
  isFavorite: boolean("is_favorite").default(false).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),

  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const labels = pgTable("label", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").unique().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
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
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  dueAt: timestamp("due_at", { withTimezone: true, mode: "string" })
    .default(sql`now() + INTERVAL '1 MONTHS'`)
    .notNull(),

  labelId: text("label_id").references(() => labels.id),
  groupId: text("group_id")
    .references(() => groups.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const groupsRelations = relations(groups, ({ many, one }) => ({
  tasks: many(tasks),
  user: one(users, {
    fields: [groups.userId],
    references: [users.id],
  }),
}));

export const labelsRelations = relations(labels, ({ many, one }) => ({
  tasks: many(tasks),
  user: one(users, {
    fields: [labels.userId],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  group: one(groups, {
    fields: [tasks.groupId],
    references: [groups.id],
  }),
  label: one(labels, {
    fields: [tasks.labelId],
    references: [labels.id],
  }),
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));
