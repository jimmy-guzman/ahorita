/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_DOMAIN: string;
  readonly VITE_OTEL_DASHBOARD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
