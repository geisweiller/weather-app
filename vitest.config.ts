/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8",
      reporter: ["lcov"],
      reportsDirectory: "./coverage",
    },
    globals: true,
    environment: "jsdom",
    setupFiles: ["./setupTests.ts"],
  },
});
