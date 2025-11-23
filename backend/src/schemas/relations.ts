import { relations } from "drizzle-orm";
import { projects, tasks } from "./projects";
import { sessions, users } from "./users";

export const usersRelations = relations(users, ({ many }) => ({
  session: many(sessions),
  projects: many(projects),
  tasks: many(tasks),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));
