import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { generateId } from "lucia";
import { Argon2id } from "oslo/password";
import { lucia } from "../auth";
import { db } from "../db";
import { users } from "../schemas";
import { isPasswordStrong } from "../utils/is-password-strong";

const tags = ["Authentication"];

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post(
    "/login",
    async ({ body: { username, password }, cookie, error }) => {
      const [existingUser] = await db
        .select()
        .from(users)
        .where(eq(users.username, username));

      if (!existingUser) {
        return error(401, "Invalid Username");
      }

      const validPassword = await new Argon2id().verify(
        existingUser.password,
        password,
      );

      if (!validPassword) {
        return error(401, "Invalid Password");
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
      detail: { tags, summary: "Login" },
    },
  )
  .post(
    "/signup",
    async ({ body: { username, password }, cookie, error }) => {
      if (!(await isPasswordStrong(password))) {
        return error(400, "Weak Password");
      }

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
      detail: { tags, summary: "Signup" },
    },
  )
  .post(
    "/logout",
    async ({ request, cookie, error }) => {
      const cookieHeader = request.headers.get("Cookie");

      if (!cookieHeader) {
        return error(401, "No Cookie");
      }

      const sessionId = lucia.readSessionCookie(cookieHeader);

      if (!sessionId) {
        return error(401, "No Session");
      }

      const { session } = await lucia.validateSession(sessionId);

      if (!session) {
        return error(401, "Invalid Session");
      }

      await lucia.invalidateSession(session.id);

      const sessionCookie = lucia.createBlankSessionCookie();

      cookie[sessionCookie.name]?.set({
        value: sessionCookie.value,
        ...sessionCookie.attributes,
      });
    },
    {
      detail: { tags, summary: "Logout" },
    },
  );
