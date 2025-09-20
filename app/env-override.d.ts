/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  [key: string]: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "react-router" {
  // Your AppLoadContext used in v2
  interface AppLoadContext {
    whatever: string;
  }
}

declare const __BUILD_DATE__: string;
