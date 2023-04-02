import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all', { prefix: 'REACT_APP_' })],
  resolve: {
    alias: [{ find: '@src', replacement: '/src/' }],
  },
  server: {
    port: 3000,
    open: true,
  },
});
