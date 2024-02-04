import path from 'node:path';

import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line new-cap
  plugins: [react(), TanStackRouterVite()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
