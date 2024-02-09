import { t } from "elysia";

export const TaskDto = t.Object({
	id: t.String(),
	name: t.String(),
	status: t.Union([
		t.Literal("BACKLOG"),
		t.Literal("TODO"),
		t.Literal("IN_PROGRESS"),
		t.Literal("DONE"),
		t.Literal("CANCELED"),
	]),
	createdAt: t.String(),
	updatedAt: t.String(),
	tagId: t.String(),
});
