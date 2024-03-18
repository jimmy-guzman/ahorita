import { Elysia } from "elysia";

import { taskRoutes } from "./tasks.$taskId";

export const tasksRoutes = new Elysia({ prefix: "/tasks" }).use(taskRoutes);
