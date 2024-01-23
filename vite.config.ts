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
  define: {
    "process.env": process.env,
  },
});
