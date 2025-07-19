import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined
      }
    },
    target: 'es2020',
    minify: 'terser',
    sourcemap: false,
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@rollup/rollup-linux-x64-gnu']
  },
  resolve: {
    alias: {
      'cookie': 'cookie/dist/index.js'
    }
  },
  server: {
    port: 3000,
    host: true
  }
}) 