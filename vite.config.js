import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import polyfillNode from "rollup-plugin-polyfill-node";

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // Fixes global variable issues
    "process.env": {},
  },
  resolve: {
    alias: {
      stream: "stream-browserify",
      crypto: "crypto-browserify",
      http: "stream-http",
      https: "https-browserify",
      zlib: "browserify-zlib",
      url: "url/",
    },
  },
  build: {
    rollupOptions: {
      plugins: [polyfillNode()],
    },
  },
});
