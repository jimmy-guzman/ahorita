import { relations, sql } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { nanoid } from "../utils";
import { users } from "./users";

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

export const priorityEnum = pgEnum("priority", ["LOW", "MEDIUM", "HIGH"]);

export const statusEnum = pgEnum("status", [
  "BACKLOG",
  "TODO",
  "IN_PROGRESS",
  "DONE",
  "CANCELED",
]);

export const tasks = pgTable("task", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").notNull(),
  status: statusEnum("status").default("TODO").notNull(),
  priority: priorityEnum("priority").default("MEDIUM").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "string" })
    .defaultNow()
    .notNull(),
  dueAt: timestamp("due_at", { withTimezone: true, mode: "string" })
    .default(sql`now() + INTERVAL '1 MONTHS'`)
    .notNull(),

  label: text("label_id").references(() => labels.name),
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
    fields: [tasks.label],
    references: [labels.name],
  }),
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));