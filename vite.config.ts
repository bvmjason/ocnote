import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'markdown': ['react-markdown', 'remark-gfm', 'rehype-highlight'],
        },
      },
    },
  },
  optimizeDeps: {
    include: ['react-markdown', 'remark-gfm', 'rehype-highlight', 'fuse.js'],
  },
  // 将 Markdown 文件作为资源处理
  assetsInclude: ['**/*.md'],
})
