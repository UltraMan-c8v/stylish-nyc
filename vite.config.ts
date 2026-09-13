import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      // Separate documents rather than a client-side router. Each legal page
      // gets its own title and description, and the build needs no SPA
      // rewrite rule on a static host.
      input: {
        main: resolve(__dirname, 'index.html'),
        gallery: resolve(__dirname, 'gallery/index.html'),
        concept: resolve(__dirname, 'concept/index.html'),
        prices: resolve(__dirname, 'prices/index.html'),
        terms: resolve(__dirname, 'terms/index.html'),
        privacy: resolve(__dirname, 'privacy/index.html'),
      },
    },
  },
})
