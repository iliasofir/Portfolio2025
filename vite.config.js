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
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "motion-vendor": ["framer-motion"], // Kept separate for code splitting
          "icons-vendor": ["react-icons"],
        },
      },
    },
    // Chunk size warning threshold
    chunkSizeWarningLimit: 1000,
    // Use esbuild minifier (faster and included by default)
    minify: "esbuild",
    // Additional optimizations
    target: "esnext", // Modern browsers for better optimization
    cssCodeSplit: true, // Split CSS for better caching
    sourcemap: false, // Disable sourcemaps in production for smaller size
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom"],
    exclude: [], // Can exclude heavy deps if needed
  },
});
