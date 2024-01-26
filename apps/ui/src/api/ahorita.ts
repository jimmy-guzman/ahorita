import type { App } from '@ahorita/api';
import { edenFetch } from '@elysiajs/eden';

export const api = edenFetch<App>(import.meta.env.VITE_AHORITA_API_ORIGIN);

export type Schema = App['schema'];
