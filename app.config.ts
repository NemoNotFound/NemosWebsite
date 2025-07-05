import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss(), cloudflare()],
  },

  server: {
    preset: "cloudflare-pages",

    rollupConfig: {
      external: ["node:async_hooks"],
    },
  },
});
