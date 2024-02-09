import type { App } from "@ahorita/api";
import { edenTreaty } from "@elysiajs/eden";

export const api = edenTreaty<App>(import.meta.env.VITE_AHORITA_API_ORIGIN);

export type Api = App["schema"];
