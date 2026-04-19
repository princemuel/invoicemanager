import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import devtoolsJson from "vite-plugin-devtools-json";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  envPrefix: "PUBLIC_",
  server: { host: true, port: 3000 },
  define: { __BUILD_DATE__: JSON.stringify(new Date()) },
  plugins: [
    devtoolsJson(),
    tailwindcss(),
    svgr({ include: "**/*.svg?component", exclude: "**/*.svg" }),
    reactRouter(),
    tsconfigPaths(),
  ],
});
