import type { App } from "@ahorita/backend";
import { edenTreaty } from "@elysiajs/eden";

export const api = edenTreaty<App>(import.meta.env.VITE_SERVER_DOMAIN, {
  $fetch: {
    credentials: "include",
  },
});

export type API = App["schema"];
