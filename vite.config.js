import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', 
  plugins: [react()],

  server:{
    port: 5001,
    open: true,          // 自动打开浏览器
    cors: true,          // 启用 CORS
    strictPort: false,    // 如果端口被占用，使用下一个可用端口
    proxy: {
      '/api': {
        target: 'https://frontend-homepage.onrender.com',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: false,    // 生产环境不生成 sourcemap
    minify: 'terser',    // 使用 terser 进行压缩
    target: 'esnext',    // 现代浏览器
    
    rollupOptions: {
      output: {
        manualChunks: {
          // 分割代码块
          vendor: ['react', 'react-dom', 'react-router-dom'],
          // 其他第三方库
          utils: ['axios', 'lucide-react']
        },
        // 生成的文件名格式
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[extname]'
      }
    }
  },


  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      'axios',
      'lucide-react'
    ],
    exclude: []
  },

})
