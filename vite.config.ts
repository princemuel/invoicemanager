import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [{ find: '@src', replacement: '/src/' }],
  },
  server: {
    port: 3000,
    open: true,
  },
});
