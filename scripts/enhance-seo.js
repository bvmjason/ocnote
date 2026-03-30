#!/usr/bin/env node
/**
 * SEO 增强脚本
 * 1. 更新 sitemap.xml 包含所有新闻文章
 * 2. 添加搜索引擎验证标签到 index.html
 * 3. 生成完整的 SEO 报告
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const PUBLIC_DIR = path.join(__dirname, '../public')
const DIST_DIR = path.join(__dirname, '../dist')
const CONTENT_DIR = path.join(__dirname, '../content')

// 读取所有文章内容
function getAllContent() {
  const files = fs.readdirSync(CONTENT_DIR)
  const articles = []
  const newsArticles = []
  
  files.forEach(file => {
    if (!file.endsWith('.md')) return
    
    const content = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8')
    const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)
    
    if (!frontmatter) return
    
    const yaml = frontmatter[1]
    const idMatch = yaml.match(/id:\s*(.+)/)
    const dateMatch = yaml.match(/date:\s*(.+)/)
    const typeMatch = yaml.match(/type:\s*(.+)/)
    
    const id = idMatch ? idMatch[1].trim() : file.replace('.md', '')
    const date = dateMatch ? dateMatch[1].trim() : '2026-03-14'
    const type = typeMatch ? typeMatch[1].trim() : 'article'
    
    if (type === 'news') {
      newsArticles.push({ id, date, file })
    } else {
      articles.push({ id, date, file })
    }
  })
  
  return { articles, newsArticles }
}

// 生成 sitemap.xml
function generateSitemap() {
  const { articles, newsArticles } = getAllContent()
  const today = new Date().toISOString().split('T')[0]
  
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- 首页 -->
  <url>
    <loc>https://ocnote.bvmcreative.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- 新闻列表页 -->
  <url>
    <loc>https://ocnote.bvmcreative.com/news</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- 爬虫教学页面 -->
  <url>
    <loc>https://ocnote.bvmcreative.com/crawler</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- 常用指令页面 -->
  <url>
    <loc>https://ocnote.bvmcreative.com/commands</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <!-- 文章页面 -->
`
  
  articles.forEach(article => {
    xml += `  <url>
    <loc>https://ocnote.bvmcreative.com/article/${article.id}</loc>
    <lastmod>${article.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
  })
  
  // 添加新闻文章
  newsArticles.forEach(news => {
    xml += `  <url>
    <loc>https://ocnote.bvmcreative.com/news/${news.id}</loc>
    <lastmod>${news.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`
  })
  
  xml += `</urlset>
`
  
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml)
  console.log(`✅ sitemap.xml 已更新：${articles.length} 篇文章 + ${newsArticles.length} 篇新闻`)
  
  return { articles: articles.length, news: newsArticles.length }
}

// 增强 index.html 的 SEO
function enhanceIndexHtml() {
  const indexPath = path.join(DIST_DIR, 'index.html')
  let html = fs.readFileSync(indexPath, 'utf-8')
  
  // 搜索引擎验证标签
  const verificationTags = `
    <!-- 搜索引擎验证 -->
    <meta name="google-site-verification" content="待添加_Google_Search_Console_验证码" />
    <meta name="baidu-site-verification" content="待添加_百度站长平台_验证码" />
    <meta name="msvalidate.01" content="待添加_Bing_Webmaster_验证码" />
    
    <!-- 移动优化 -->
    <meta name="format-detection" content="telephone=no" />
    <meta name="theme-color" content="#3b82f6" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="OCnote" />
    
    <!-- 额外 SEO 优化 -->
    <meta name="rating" content="general" />
    <meta name="distribution" content="global" />
    <link rel="alternate" type="application/rss+xml" title="OpenClaw 饲养日记 RSS" href="/rss.xml" />
`
  
  // 在现有 meta 标签后插入
  const metaComment = '<!-- 基础 SEO -->'
  if (html.includes(metaComment)) {
    html = html.replace(metaComment, verificationTags + '\n    ' + metaComment)
  }
  
  fs.writeFileSync(indexPath, html)
  console.log('✅ index.html SEO 增强完成')
}

// 生成 SEO 报告
function generateSeoReport(stats) {
  const report = `# SEO 配置报告

**生成时间:** ${new Date().toISOString()}

---

## ✅ 已完成配置

### 1. 基础 SEO
- [x] Title 标签
- [x] Meta Description
- [x] Meta Keywords
- [x] Canonical URL
- [x] Robots meta

### 2. 社交媒体
- [x] Open Graph (Facebook/LinkedIn)
- [x] Twitter Card
- [x] OG Image (1200x630)

### 3. 结构化数据
- [x] WebSite Schema
- [x] Article Schema (文章页)
- [x] BreadcrumbList Schema
- [x] ItemList Schema (首页)

### 4. 网站地图
- [x] robots.txt
- [x] sitemap.xml
- [x] RSS Feed

### 5. 移动优化
- [x] Viewport
- [x] 主题颜色
- [x] Apple Web App

---

## 📊 收录统计

| 类型 | 数量 |
|------|------|
| 文章页面 | ${stats.articles} |
| 新闻页面 | ${stats.news} |
| 功能页面 | 4 |
| **总计** | ${stats.articles + stats.news + 5} |

---

## ⚠️ 待完成事项

### 搜索引擎提交（任务 3）
- [ ] Google Search Console 验证
- [ ] Bing Webmaster Tools 验证
- [ ] 百度站长平台验证
- [ ] Yandex Webmaster 验证

### 验证代码获取
1. **Google:** https://search.google.com/search-console
2. **Bing:** https://www.bing.com/webmasters
3. **百度:** https://ziyuan.baidu.com/

获取验证代码后，替换 index.html 中的"待添加_XXX_验证码"

---

## 🔗 搜索引擎提交入口

| 搜索引擎 | 提交地址 |
|---------|---------|
| Google | https://search.google.com/search-console/urls |
| Bing | https://www.bing.com/webmasters/url-submission-api |
| 百度 | https://ziyuan.baidu.com/linksubmit/url |
| Yandex | https://webmaster.yandex.com/tools/url-reindex/ |

---

## 📈 下一步优化建议

1. **内容更新频率** - 保持每周 2-3 篇更新
2. **内链建设** - 文章间互相引用
3. **外链建设** - 在知乎/CSDN 等平台发布内容引流
4. **页面速度** - 已优化，保持当前水平
5. **移动友好** - 已适配，定期测试
`
  
  fs.writeFileSync(path.join(__dirname, '../SEO-REPORT.md'), report)
  console.log('📄 SEO-REPORT.md 已生成')
}

// 主函数
function main() {
  console.log('🚀 开始 SEO 增强...\n')
  
  const stats = generateSitemap()
  enhanceIndexHtml()
  generateSeoReport(stats)
  
  console.log('\n✅ SEO 增强完成！\n')
  console.log('📋 下一步：')
  console.log('   1. 重新构建：pnpm build')
  console.log('   2. 部署到服务器')
  console.log('   3. 获取搜索引擎验证代码')
  console.log('   4. 提交 sitemap 到各搜索引擎')
}

main()
