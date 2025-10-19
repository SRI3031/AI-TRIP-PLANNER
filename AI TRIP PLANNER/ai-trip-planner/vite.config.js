import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'controllers': path.resolve(__dirname, './controllers'),
      'middleware': path.resolve(__dirname, './middleware'),
      'config': path.resolve(__dirname, './config'),
    }
  }
})