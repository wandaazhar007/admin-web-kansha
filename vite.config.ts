import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import cors from 'cors';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.kanshamissouri.com',
        changeOrigin: true
      }

    }
  }
})
