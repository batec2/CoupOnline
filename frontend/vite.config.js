import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import Terminal from "vite-plugin-terminal";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Terminal()],
  base: "/CoupOnline/",
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
