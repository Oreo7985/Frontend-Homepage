import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: '/Frontend-Homepage',
  base: '/', 
  plugins: [react()],
  server:{
    port:5001
  },
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks:undefined
      }
    },
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: []
  }
})
