import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "~": path.resolve(__dirname, "src") },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    env: {
      SKIP_ENV_VALIDATION: "1",
      DATABASE_URL: "file:./db.sqlite",
    },
  },
});
