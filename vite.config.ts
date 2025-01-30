import { defineConfig } from "vite";
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [ tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "https://api.jsonserve.com/Uw5CrX",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
