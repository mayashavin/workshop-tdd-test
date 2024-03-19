import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    global: true,
    rootDir: './src',
    environment: 'jsdom',
    setupFiles: './setupTest.js',
    coverage: {
      provider: 'istanbul'
    }
  },
})
