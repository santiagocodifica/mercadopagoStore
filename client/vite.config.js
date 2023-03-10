import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      features: `${path.resolve(__dirname, "./src/features/")}`
    }
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "ws://localhost:8080",
        changeOrigin: true,
        secure: false,
        ws: true
      }
    },
    port: 5173
  }
})
