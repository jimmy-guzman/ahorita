import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

import { nanoid, nowAsISO } from "../utils";
import { users } from "./users";

export const projects = sqliteTable("project", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description").notNull(),
  isFavorite: integer("is_favorite", { mode: "boolean" })
    .default(false)
    .notNull(),
  isDone: integer("is_done", { mode: "boolean" }).default(false).notNull(),
  createdAt: text("created_at").$default(nowAsISO).notNull(),
  updatedAt: text("updated_at")
    .$default(nowAsISO)
    .$onUpdate(nowAsISO)
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const tasks = sqliteTable("task", {
  id: text("id").$default(nanoid).primaryKey(),
  name: text("name").notNull(),
  status: text("status", {
    enum: ["Backlog", "Todo", "In Progress", "Done", "Canceled"],
  })
    .default("Todo")
    .notNull(),
  priority: text("priority", {
    enum: ["Low", "Medium", "High"],
  })
    .default("Medium")
    .notNull(),
  label: text("label", {
    enum: ["Feature", "Bug", "Documentation"],
  })
    .default("Feature")
    .notNull(),
  createdAt: text("created_at").$default(nowAsISO).notNull(),
  updatedAt: text("updated_at")
    .$default(nowAsISO)
    .$onUpdate(nowAsISO)
    .notNull(),
  projectId: text("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

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
