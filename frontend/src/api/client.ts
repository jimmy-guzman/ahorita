import type { App } from "@ahorita/backend";
import { treaty } from "@elysiajs/eden";

export const api = treaty<App>(import.meta.env.VITE_SERVER_DOMAIN, {
  fetch: {
    credentials: "include",
  },
  // TODO: change back to patch when https://github.com/elysiajs/eden/issues/61 is addressed
  fetcher: (requestInfo, requestInit) => {
    return fetch(requestInfo, {
      ...requestInit,
      method: requestInit?.method?.toUpperCase(),
    });
  },
});

export type APIRoutes = App["_routes"];

export type APITypes = App["_types"]["Definitions"]["type"];
