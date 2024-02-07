import { relations, sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const tags = sqliteTable('tags', {
  id: text('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  name: text('name').unique().notNull(),
  description: text('description').notNull(),
  createdAt: text('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updatedAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const tasks = sqliteTable('tasks', {
  id: text('id')
    .$defaultFn(() => nanoid())
    .primaryKey(),
  name: text('name').notNull(),
  completed: integer('completed', { mode: 'boolean' }).default(false).notNull(),
  createdAt: text('createdAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text('updatedAt')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),

  tagId: text('tagId')
    .references(() => tags.id, { onDelete: 'cascade' })
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
