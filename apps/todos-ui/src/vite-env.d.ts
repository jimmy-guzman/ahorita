/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TASKS_API_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
