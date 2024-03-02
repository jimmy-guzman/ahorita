import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

import { dueDateAsISO, nowAsISO } from "../utils";
import { users } from "./users";

const statuses = <const>["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELED"];

const priorities = <const>["LOW", "MEDIUM", "HIGH"];

export const tags = sqliteTable("tag", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description").notNull(),
  createdAt: text("created_at").$default(nowAsISO).notNull(),
  updatedAt: text("updated_at").$default(nowAsISO).notNull(),

  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const tasks = sqliteTable("task", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").notNull(),
  status: text("status", { enum: statuses }).default("TODO").notNull(),
  priority: text("priority", { enum: priorities }).default("MEDIUM").notNull(),
  createdAt: text("created_at").$default(nowAsISO).notNull(),
  updatedAt: text("updated_at").$default(nowAsISO).notNull(),
  dueAt: text("due_at").$default(dueDateAsISO).notNull(),

  tagId: text("tag_id")
    .references(() => tags.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  tag: one(tags, {
    fields: [tasks.tagId],
    references: [tags.id],
  }),
}));
