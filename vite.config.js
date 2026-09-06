import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative paths work both locally and under /<repository>/ on GitHub Pages.
  base: '/Mia-app/',
})
          