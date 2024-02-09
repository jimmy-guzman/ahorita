import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

const now = () => new Date().toISOString();

export const tags = sqliteTable("tags", {
	id: text("id")
		.$default(() => nanoid())
		.primaryKey(),
	name: text("name").unique().notNull(),
	description: text("description").notNull(),
	createdAt: text("createdAt").$default(now).notNull(),
	updatedAt: text("updatedAt").$default(now).notNull(),
});

export const tasks = sqliteTable("tasks", {
	id: text("id")
		.$default(() => nanoid())
		.primaryKey(),
	name: text("name").notNull(),
	status: text("status", {
		enum: ["BACKLOG", "TODO", "IN_PROGRESS", "DONE", "CANCELED"],
	})
		.default("TODO")
		.notNull(),
	createdAt: text("createdAt").$default(now).notNull(),
	updatedAt: text("updatedAt").$default(now).notNull(),

	tagId: text("tagId")
		.references(() => tags.id, { onDelete: "cascade" })
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
