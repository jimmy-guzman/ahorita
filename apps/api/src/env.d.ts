/// <reference types="bun-types/overrides.d.ts" />

// TODO: remove reference once https://github.com/oven-sh/bun/issues/8736 is addressed
declare module "bun" {
	interface Env {
		DATABASE_URL: string;
		QUERY_LOGGING?: "false" | "true";
	}
}
