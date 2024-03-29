import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "../auth";
import { db } from "../db";
import { users } from "../schemas";

const tags = ["Authentication"];

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
    "/login",
    async ({ set, body: { username, password }, cookie }) => {
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.username, username));

      if (!existingUser) {
        set.status = 401;

        throw new Error("Invalid Username");
      }

      const validPassword = await new Argon2id().verify(
        existingUser.password,
        password,
      );

      if (!validPassword) {
        set.status = 401;

        throw new Error("Invalid Password");
      }

      const session = await lucia.createSession(existingUser.id, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookie[sessionCookie.name]?.set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });

      return { login: true };
    },
    {
      body: t.Object({ username: t.String(), password: t.String() }),
      detail: { tags },
    },
  )
  .post(
    "/signup",
    async ({ body: { username, password }, cookie }) => {
      const hashedPassword = await new Argon2id().hash(password);

      const userId = generateId(15);

      await db
        .insert(users)
        .values({ username, password: hashedPassword, id: userId });

      const session = await lucia.createSession(userId, {});
      const sessionCookie = lucia.createSessionCookie(session.id);

      cookie[sessionCookie.name]?.set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
      detail: { tags },
    },
  )
  .post(
    "/logout",
    async ({ set, request, cookie }) => {
      const cookieHeader = request.headers.get("Cookie") ?? "";

      const sessionId = lucia.readSessionCookie(cookieHeader);

      if (!sessionId) {
        set.status = 401;

        throw new Error("No Session");
      }

      const { session } = await lucia.validateSession(sessionId);

      if (!session) {
        set.status = 401;

        throw new Error("Invalid Session");
      }

      await lucia.invalidateSession(session.id);

      const sessionCookie = lucia.createBlankSessionCookie();

      cookie[sessionCookie.name]?.set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    },
    {
      detail: { tags },
    },
  );
