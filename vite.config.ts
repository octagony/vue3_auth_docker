import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    watch: {
      usePolling: true
    },
    host: true,
    port: 5173,
    strictPort: true
  },
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
      "@": fileURLToPath(new URL("./src/components", import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
              @import "./src/assets/scss/_reset.scss";
              @import "./src/assets/scss/_variables.scss";
              @import "./src/assets/global.scss";
              @import "./src/assets/components.scss";
            `
      }
    }
  }
});
