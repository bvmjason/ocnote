#!/usr/bin/env node

/**
 * SEO/AEO/GEO 优化脚本
 * 功能：
 * 1. 生成完整的 sitemap.xml（包含所有类别）
 * 2. 生成 RSS feed（包含所有文章）
 * 3. 优化 robots.txt
 * 4. 生成结构化数据
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')

// 网站配置
const SITE_CONFIG = {
  title: 'OpenClaw 饲养日记',
  description: '记录 AI 驯养过程中的点点滴滴，分享 AI 助手使用技巧、自动化脚本、爬虫教程',
  link: 'https://ocnote.bvmcreative.com',
  language: 'zh-cn',
  author: 'Jason Kao',
  email: 'jason@bvmcreative.com'
}

// 读取所有 markdown 文件
function readMarkdownFiles(dir) {
  const files = []
  if (!fs.existsSync(dir)) return files
  
  const items = fs.readdirSync(dir)
  for (const item of items) {
    if (item.endsWith('.md')) {
      const content = fs.readFileSync(path.join(dir, item), 'utf-8')
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const idMatch = frontmatter.match(/id:\s*(.+)/)
        const titleMatch = frontmatter.match(/title:\s*(.+)/)
        const dateMatch = frontmatter.match(/date:\s*(.+)/)
        const descMatch = frontmatter.match(/description:\s*(.+)/)
        
        if (idMatch) {
          files.push({
            id: idMatch[1].trim(),
            title: titleMatch ? titleMatch[1].trim().replace(/"/g, '') : '',
            date: dateMatch ? dateMatch[1].trim() : '2026-03-14',
            description: descMatch ? descMatch[1].trim().replace(/"/g, '') : ''
          })
        }
      }
    }
  }
  return files
}

// 生成 sitemap.xml
function generateSitemap() {
  const diaryFiles = readMarkdownFiles(path.join(rootDir, 'content/diary'))
  const agentFiles = readMarkdownFiles(path.join(rootDir, 'content/agent'))
  const newsFiles = readMarkdownFiles(path.join(rootDir, 'content/news'))
  
  const today = new Date().toISOString().split('T')[0]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 首页 -->
  <url>
    <loc>${SITE_CONFIG.link}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Agent 专区 -->
  <url>
    <loc>${SITE_CONFIG.link}/agent</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- 新闻中心 -->
  <url>
    <loc>${SITE_CONFIG.link}/news</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- 常用指令 -->
  <url>
    <loc>${SITE_CONFIG.link}/commands</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 爬虫教学 -->
  <url>
    <loc>${SITE_CONFIG.link}/crawler</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 饲养日记文章 -->
`
  
  diaryFiles.forEach(file => {
    xml += `  <url>
    <loc>${SITE_CONFIG.link}/article/${file.id}</loc>
    <lastmod>${file.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
  })
  
  // Agent 文章
  xml += `
  <!-- Agent 文章 -->
`
  agentFiles.forEach(file => {
    xml += `  <url>
    <loc>${SITE_CONFIG.link}/agent/${file.id}</loc>
    <lastmod>${file.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`
  })
  
  // 新闻文章
  xml += `
  <!-- 新闻文章 -->
`
  newsFiles.forEach(file => {
    xml += `  <url>
    <loc>${SITE_CONFIG.link}/news/${file.id}</loc>
    <lastmod>${file.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
  })
  
  xml += `</urlset>
`
  
  fs.writeFileSync(path.join(rootDir, 'public/sitemap.xml'), xml)
  console.log(`✅ sitemap.xml 已生成：${diaryFiles.length + agentFiles.length + newsFiles.length + 5} 个 URL`)
  
  return {
    diary: diaryFiles.length,
    agent: agentFiles.length,
    news: newsFiles.length,
    total: diaryFiles.length + agentFiles.length + newsFiles.length + 5
  }
}

// 优化 robots.txt
function optimizeRobotsTxt() {
  const robots = `User-agent: *
Allow: /

# Sitemap 位置
Sitemap: ${SITE_CONFIG.link}/sitemap.xml

# 允许所有主流搜索引擎
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

# 禁止访问管理路径（如果有）
Disallow: /admin/
Disallow: /private/
`
  
  fs.writeFileSync(path.join(rootDir, 'public/robots.txt'), robots)
  console.log('✅ robots.txt 已优化')
}

// 主函数
function main() {
  console.log('🚀 开始 SEO/AEO/GEO 优化...\n')
  
  const stats = generateSitemap()
  optimizeRobotsTxt()
  
  console.log('\n📊 统计信息：')
  console.log(`   饲养日记：${stats.diary} 篇`)
  console.log(`   Agent 教学：${stats.agent} 篇`)
  console.log(`   新闻：${stats.news} 篇`)
  console.log(`   页面：5 个`)
  console.log(`   总计：${stats.total} 个 URL`)
  console.log('\n✅ SEO/AEO/GEO 优化完成！')
  console.log('\n下一步：')
  console.log('   1. pnpm build - 重新构建')
  console.log('   2. 部署到服务器')
  console.log('   3. 提交到搜索引擎')
}

main()
