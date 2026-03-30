#!/usr/bin/env node

/**
 * RSS 生成脚本（简化版）
 * 直接从 content.ts 导入文章数据生成 RSS
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

// 文章元数据（手动维护，与 content.ts 同步）
const ARTICLES = [
  { id: 'model-selection', title: '模型的对比与选择 - 不同职业怎么选 AI', category: 'intro', date: '2026-03-13', description: '不同职业背景如何选择适合自己的 AI 模型' },
  { id: 'first-chat', title: '第一次和 OpenClaw 聊天', category: 'intro', date: '2026-03-14', description: '记录第一次使用 OpenClaw 的经历' },
  { id: 'basic-formula', title: '基础指令公式', category: 'intro', date: '2026-03-15', description: 'AI 指令的基础公式和模板' },
  { id: 'advanced-tips', title: '进阶技巧', category: 'intro', date: '2026-03-16', description: '提升 AI 输出质量的高级技巧' },
  { id: 'practical-templates', title: '实用模板', category: 'intro', date: '2026-03-17', description: '日常工作常用的 AI 指令模板' },
  { id: 'industry-cases', title: '行业案例', category: 'intro', date: '2026-03-18', description: 'AI 在各行业的实际应用案例' },
  { id: 'week1-summary', title: '第一周总结', category: 'intro', date: '2026-03-19', description: '使用 OpenClaw 第一周的心得体会' },
  { id: 'lobster-intern', title: '龙虾实习生', category: 'advanced', date: '2026-03-20', description: '把 AI 当实习生带的技巧' },
  { id: 'unique-lobster', title: '独特的龙虾', category: 'advanced', date: '2026-03-21', description: '每个 AI 助手都有独特的个性' },
  { id: 'lobster-memory', title: '龙虾的记忆', category: 'advanced', date: '2026-03-22', description: 'AI 助手的记忆机制详解' },
  { id: 'instruction-debugging', title: '指令调试', category: 'advanced', date: '2026-03-23', description: '如何调试和优化 AI 指令' },
  { id: 'file-processing', title: '文件处理', category: 'advanced', date: '2026-03-24', description: '让 AI 处理各类文件的技巧' },
  { id: 'data-analysis', title: '数据分析', category: 'advanced', date: '2026-03-25', description: '用 AI 进行数据分析的方法' },
  { id: 'week2-summary', title: '第二周总结', category: 'advanced', date: '2026-03-26', description: '使用 OpenClaw 第二周的心得体会' },
  { id: 'ai-cognition-gap', title: 'AI 认知差距', category: 'cognition', date: '2026-03-27', description: '人与 AI 之间的认知差异分析' },
  { id: 'ai-visual-limitation', title: 'AI 视觉局限', category: 'cognition', date: '2026-03-28', description: 'AI 在视觉理解上的局限性' },
  { id: 'first-automation-script', title: '第一个自动化脚本', category: 'cognition', date: '2026-03-29', description: '用 AI 编写自动化脚本的经历' }
]

// 生成 RSS 2.0 XML
function generateRSS() {
  const now = new Date().toUTCString()
  
  let items = ''
  
  for (const article of ARTICLES) {
    const pubDate = new Date(article.date).toUTCString()
    const link = `${SITE_CONFIG.link}/article/${article.id}`
    
    items += `    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <description><![CDATA[${article.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <author>${SITE_CONFIG.email} (${SITE_CONFIG.author})</author>
      <category>${article.category}</category>
    </item>
`
  }
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title><![CDATA[${SITE_CONFIG.title}]]></title>
    <link>${SITE_CONFIG.link}</link>
    <description><![CDATA[${SITE_CONFIG.description}]]></description>
    <language>${SITE_CONFIG.language}</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.link}/rss.xml" rel="self" type="application/rss+xml" />
    <generator>OCnote RSS Generator</generator>
    <copyright>Copyright ${new Date().getFullYear()} ${SITE_CONFIG.author}</copyright>
${items}  </channel>
</rss>`
  
  return rss
}

// 主函数
function main() {
  console.log('📰 开始生成 RSS...')
  
  try {
    // 生成 RSS
    const rss = generateRSS()
    
    // 写入 public 目录
    const publicDir = path.join(rootDir, 'public')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }
    
    const rssPath = path.join(publicDir, 'rss.xml')
    fs.writeFileSync(rssPath, rss, 'utf-8')
    
    console.log(`✅ RSS 文件已生成：${rssPath}`)
    console.log(`📍 访问地址：${SITE_CONFIG.link}/rss.xml`)
    console.log(`📄 包含 ${ARTICLES.length} 篇日记文章`)
  } catch (error) {
    console.error('❌ RSS 生成失败:', error.message)
    process.exit(1)
  }
}

main()
