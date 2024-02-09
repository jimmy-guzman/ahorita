import { eq } from "drizzle-orm";
import { Elysia, InternalServerError, NotFoundError, t } from "elysia";

import { db } from "../db";
import { TagDto } from "../models/tags";
import { TaskDto } from "../models/tasks";
import { tags, tasks } from "../schema";

export const tagsRoute = new Elysia().group(
	"/tags",
	{ detail: { tags: ["Tags"] } },
	(app) =>
		app
			.get(
				"",
				async () => {
					const results = await db.query.tags.findMany({
						with: { tasks: true },
					});

					return results.map(({ tasks: _tasks, ...tag }) => ({
						...tag,
						_count: { tasks: _tasks.length },
					}));
				},
				{
					response: t.Array(TagDto),
				},
			)
			.post(
				"",
				async ({ body }) => {
					const [tag] = await db.insert(tags).values(body).returning();

					if (!tag) throw InternalServerError;

					return { ...tag, _count: { tasks: 0 } };
				},
				{
					body: t.Pick(TagDto, ["name", "description"]),
					response: TagDto,
				},
			)
			.get(
				"/:id",
				async ({ params: { id } }) => {
					const [tag] = await db.query.tags.findMany({
						where: eq(tags.id, id),
						with: { tasks: true },
						limit: 1,
					});

					if (!tag) throw NotFoundError;

					const { tasks: _tasks, ...rest } = tag;

					return { ...rest, _count: { tasks: _tasks.length } };
				},
				{
					params: t.Object({ id: t.String() }),
					response: TagDto,
				},
			)
			.delete(
				"/:id",
				async ({ params: { id } }) => {
					const result = await db.transaction(async (tx) => {
						const [tag] = await tx
							.delete(tags)
							.where(eq(tags.id, id))
							.returning();

						if (!tag) throw NotFoundError;

						await tx.delete(tasks).where(eq(tasks.tagId, id));

						return tag;
					});

					return { ...result, _count: { tasks: 0 } };
				},
				{
					params: t.Object({ id: t.String() }),
					response: TagDto,
				},
			)
			.get(
				"/:id/tasks",
				async ({ params: { id } }) => {
					return db.query.tasks.findMany({ where: eq(tasks.tagId, id) });
				},
				{
					params: t.Object({ id: t.String() }),
					response: t.Array(TaskDto),
				},
			)
			.post(
				"/:id/tasks",
				async ({ params: { id }, body }) => {
					const [task] = await db
						.insert(tasks)
						.values({ ...body, tagId: id })
						.returning();

					if (!task) throw InternalServerError;

					return task;
				},
				{
					params: t.Object({ id: t.String() }),
					body: t.Pick(TaskDto, ["name"]),
					response: TaskDto,
				},
			),
);
