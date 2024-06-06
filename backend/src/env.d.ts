declare module "bun" {
  interface Env {
    DATABASE_URL: string;
    TURSO_AUTH_TOKEN: string;
    QUERY_LOGGING?: "false" | "true";
  }
}
