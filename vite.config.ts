import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/weather-app/",
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        404: "./404.html",
      },
    },
  },
  preview: {
    port: 8000,
    strictPort: true,
  },
  server: {
    port: 8000,
    strictPort: true,
    host: true,
    origin: "http://0.0.0.0:8000",
  },
  define: {
    "process.env": process.env,
  },
});
