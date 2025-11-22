import type { App } from "@ahorita/backend";
import { treaty } from "@elysiajs/eden";

export const api = treaty<App>(import.meta.env.VITE_SERVER_DOMAIN, {
  fetch: {
    credentials: "include",
  },
});

export type APIRoutes = App["~Routes"];
