import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { customAlphabet } from "nanoid";
import { users } from "./users";

const now = () => new Date().toISOString();

const statuses = <const>["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELED"];

const priorities = <const>["LOW", "MEDIUM", "HIGH"];

// cspell:disable-next-line
const nanoid = customAlphabet("6T9834PX7JACKVERYMNDBUHWLFGQ", 4);

export const tags = sqliteTable("tag", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description").notNull(),
  createdAt: text("created_at").$default(now).notNull(),
  updatedAt: text("updated_at").$default(now).notNull(),

  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
});

export const tasks = sqliteTable("task", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  name: text("name").notNull(),
  status: text("status", { enum: statuses }).default("TODO").notNull(),
  priority: text("priority", { enum: priorities }).default("MEDIUM").notNull(),
  createdAt: text("created_at").$default(now).notNull(),
  updatedAt: text("updated_at").$default(now).notNull(),

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
