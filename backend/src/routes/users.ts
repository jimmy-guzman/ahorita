import { Elysia, t } from "elysia";

import { auth } from "../auth";

const tags = ["User"];

const UserSchema = t.Object({
  user: t.Nullable(
    t.Object({ id: t.String(), email: t.String(), name: t.String() }),
  ),
});

export const usersRoutes = new Elysia({ prefix: "/users" })
  .model({ User: UserSchema })
  .get(
    "/me",
    async ({ request: { headers } }) => {
      const session = await auth.api.getSession({ headers });
      const user = session?.user;

      return {
        user: user ? { id: user.id, email: user.email, name: user.name } : null,
      };
    },
    {
      response: "User",
      detail: { tags, summary: "Get Me" },
    },
  );
