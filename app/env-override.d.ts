/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  [key: string]: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __BUILD_DATE__: string;
