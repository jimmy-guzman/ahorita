declare module "bun" {
  interface Env {
    DATABASE_URL: string;
    QUERY_LOGGING?: "false" | "true";
  }
}
