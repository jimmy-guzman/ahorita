import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { customAlphabet } from "nanoid";
import { userTable } from ".";

const now = () => new Date().toISOString();

const statuses = <const>["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELED"];

const priorities = <const>["LOW", "MEDIUM", "HIGH"];

// cspell:disable-next-line
const nanoid = customAlphabet("6T9834PX7JACKVERYMNDBUHWLFGQ", 4);

export const tagsTable = sqliteTable("tags", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  name: text("name").unique().notNull(),
  description: text("description").notNull(),
  createdAt: text("createdAt").$default(now).notNull(),
  updatedAt: text("updatedAt").$default(now).notNull(),

  userId: text("userId")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const tasksTable = sqliteTable("tasks", {
  id: text("id")
    .$default(() => nanoid())
    .primaryKey(),
  name: text("name").notNull(),
  status: text("status", { enum: statuses }).default("TODO").notNull(),
  priority: text("priority", { enum: priorities }).default("MEDIUM").notNull(),
  createdAt: text("createdAt").$default(now).notNull(),
  updatedAt: text("updatedAt").$default(now).notNull(),

  tagId: text("tagId")
    .references(() => tagsTable.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("userId")
    .references(() => userTable.id, { onDelete: "cascade" })
    .notNull(),
});

export const tagsRelations = relations(tagsTable, ({ many }) => ({
  tasks: many(tasksTable),
}));

export const tasksRelations = relations(tasksTable, ({ one }) => ({
  tag: one(tagsTable, {
    fields: [tasksTable.tagId],
    references: [tagsTable.id],
  }),
}));
