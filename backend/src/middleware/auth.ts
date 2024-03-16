import { Elysia } from "elysia";
import { verifyRequestOrigin } from "lucia";

import { lucia } from "../auth";

export const auth = new Elysia().derive({ as: "global" }, async (context) => {
  // CSRF check
  if (context.request.method !== "GET" && Bun.env.NODE_ENV === "production") {
    const originHeader = context.request.headers.get("Origin");
    // NOTE: You may need to use `X-Forwarded-Host` instead
    const hostHeader = context.request.headers.get("Host");

    const hasValidOrigin =
      originHeader &&
      hostHeader &&
      verifyRequestOrigin(originHeader, [hostHeader]);

    if (!hasValidOrigin) {
      return {
        user: null,
        session: null,
      };
    }
  }

  // use headers instead of Cookie API to prevent type coercion
  const cookieHeader = context.request.headers.get("Cookie") ?? "";
  const sessionId = lucia.readSessionCookie(cookieHeader);

  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const { session, user } = await lucia.validateSession(sessionId);

  if (session?.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);

    context.cookie[sessionCookie.name]?.set({
      value: sessionCookie.value,
      ...sessionCookie.attributes,
    });
  }

  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();

    context.cookie[sessionCookie.name]?.set({
      value: sessionCookie.value,
      ...sessionCookie.attributes,
    });
  }

  return {
    user,
    session,
  };
});
