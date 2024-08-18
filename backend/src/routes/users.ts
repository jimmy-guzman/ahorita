import { Elysia, t } from "elysia";

import { auth } from "../middleware/auth";

const tags = ["User"];

const UserSchema = t.Object({
  user: t.Nullable(t.Object({ id: t.String(), username: t.String() })),
});

export const usersRoutes = new Elysia({ prefix: "/users" })
  .use(auth)
  .model({ User: UserSchema })
  .get("/me", ({ user }) => ({ user }), {
    response: "User",
    detail: { tags, summary: "Get Me" },
  });
