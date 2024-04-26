import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { configDefaults } from "vitest/config";

export default defineConfig(() => ({
  plugins: [
    tsconfigPaths(),
    react(),
    TanStackRouterVite({
      generatedRouteTree: "./src/route-tree.gen.ts",
      semicolons: true,
      quoteStyle: "double",
      experimental: {
        enableCodeSplitting: true,
      },
    }),
  ],
  test: {
    environment: "happy-dom",
    globals: true,
    exclude: [...configDefaults.exclude, "e2e/*"],
    setupFiles: "./src/testing/setup.ts",
  },
}));
