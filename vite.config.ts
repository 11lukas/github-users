import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@core": path.resolve(__dirname, "./src/core"),
    },
  },
  plugins: [TanStackRouterVite({}), react()],
  base: '/github-users/'
})
