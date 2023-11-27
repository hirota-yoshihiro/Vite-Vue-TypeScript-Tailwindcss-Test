import { defineConfig } from "vite";
import * as path from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
