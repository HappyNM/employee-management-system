import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Use the official React plugin for Vite. Tailwind is configured via PostCSS
// (see postcss.config.js and src/index.css with @tailwind directives).
export default defineConfig({
  plugins: [
    react(),
  ],
})