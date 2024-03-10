/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
