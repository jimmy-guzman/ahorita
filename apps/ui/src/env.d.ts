/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_AHORITA_API_ORIGIN: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
