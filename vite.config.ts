import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { copyFileSync, mkdirSync } from 'fs'

// 自定义插件：复制 markdown 文件到 dist/assets 子目录
function copyMarkdownPlugin() {
  return {
    name: 'copy-markdown',
    closeBundle() {
      const categories = [
        { src: 'content/diary', dest: 'dist/assets/diary' },
        { src: 'content/agent', dest: 'dist/assets/agent' },
        { src: 'content/news', dest: 'dist/assets/news' }
      ]
      
      categories.forEach(({ src, dest }) => {
        const srcDir = path.resolve(__dirname, src)
        const destDir = path.resolve(__dirname, dest)
        
        if (!fs.existsSync(destDir)) {
          mkdirSync(destDir, { recursive: true })
        }
        
        const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.md'))
        files.forEach(file => {
          const src = path.join(srcDir, file)
          const content = fs.readFileSync(src, 'utf-8')
          const hash = Buffer.from(content).toString('base64').substring(0, 8)
          const baseName = file.replace('.md', '')
          const dest = path.join(destDir, `${baseName}-${hash}.md`)
          copyFileSync(src, dest)
          console.log(`Copied ${file} -> ${baseName}-${hash}.md`)
        })
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), copyMarkdownPlugin()],
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
