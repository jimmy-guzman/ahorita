import { relations } from "drizzle-orm";
import { sqliteTable } from "drizzle-orm/sqlite-core";

import { nanoid, now } from "../utils";
import { labels, priorities, statuses } from "./constants";
import { users } from "./users";

export const projects = sqliteTable("project", (t) => ({
  id: t.text().$default(nanoid).primaryKey(),
  name: t.text().unique().notNull(),
  description: t.text().notNull(),
  isFavorite: t.integer({ mode: "boolean" }).default(false).notNull(),
  isDone: t.integer({ mode: "boolean" }).default(false).notNull(),
  createdAt: t.text().$default(now).notNull(),
  updatedAt: t.text().$default(now).$onUpdate(now).notNull(),
  userId: t
    .text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
}));

export const tasks = sqliteTable("task", (t) => ({
  id: t.text().$default(nanoid).primaryKey(),
  name: t.text().notNull(),
  status: t.text({ enum: statuses }).default("Todo").notNull(),
  priority: t.text({ enum: priorities }).default("Medium").notNull(),
  label: t.text({ enum: labels }).default("Feature").notNull(),
  createdAt: t.text().$default(now).notNull(),
  updatedAt: t.text().$default(now).$onUpdate(now).notNull(),
  projectId: t
    .text()
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  userId: t
    .text()
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
}));

export const projectsRelations = relations(projects, ({ many, one }) => ({
  tasks: many(tasks),
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
}));

export const tasksRelations = relations(tasks, ({ one }) => ({
  project: one(projects, {
    fields: [tasks.projectId],
    references: [projects.id],
  }),
  user: one(users, {
    fields: [tasks.userId],
    references: [users.id],
  }),
}));
