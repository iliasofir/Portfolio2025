import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Permet l'accès depuis le réseau local
    port: 5173,
  },
  build: {
    // Performance optimizations
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor code
          "react-vendor": ["react", "react-dom"],
          "motion-vendor": ["framer-motion"],
        },
      },
    },
    // Chunk size warning threshold
    chunkSizeWarningLimit: 1000,
    // Use default esbuild minifier (faster and included by default)
    minify: "esbuild",
  },
});
