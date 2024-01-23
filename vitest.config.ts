/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.stories.{ts,tsx}",
        "src/services/types/*.{ts,tsx}",
        "src/vite-env.d.ts",
        "src/main.tsx",
      ],
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
  },
});
