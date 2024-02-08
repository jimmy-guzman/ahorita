import path from 'node:path';

import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line new-cap
  plugins: [react(), TanStackRouterVite()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  test: {
    environment: 'happy-dom',
    globals: true,
    exclude: [...configDefaults.exclude, 'e2e/*'],
    setupFiles: './src/test/setup.ts',
  },
});
