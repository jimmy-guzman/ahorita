import { Elysia, t } from "elysia";

import { auth } from "../middleware/auth";

export const usersRoutes = new Elysia({ prefix: "/users" })
  .use(auth)
  .model({
    user: t.Object({
      user: t.Union([
        t.Object({ id: t.String(), username: t.String() }),
        t.Null(),
      ]),
    }),
  })
  .get("/me", async ({ user }) => ({ user }), {
    response: "user",
    detail: { tags: ["User"] },
  });
