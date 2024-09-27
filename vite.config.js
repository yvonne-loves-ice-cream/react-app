import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["/src/test/vitest.setup.js"],
    testTimeout: 10000
  },
});
