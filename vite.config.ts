import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@src', replacement: '/src/' }],
  },
  server: {
    port: 3000,
    open: true,
  },
});
