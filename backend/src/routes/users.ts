import { Elysia, t } from "elysia";

import { auth } from "../middleware/auth";

const UserDto = t.Object({
  user: t.Union([t.Object({ id: t.String(), username: t.String() }), t.Null()]),
});

export const usersRoutes = new Elysia({ prefix: "/users" })
  .use(auth)
  .model({ user: UserDto })
  .get("/me", ({ user }) => ({ user }), {
    response: "user",
    detail: { tags: ["User"] },
  });
