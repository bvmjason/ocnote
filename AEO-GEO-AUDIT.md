# OCnote AEO/GEO 架构审计报告

**审计时间：** 2026-03-29 23:45  
**审计范围：** 答案引擎优化 (AEO) + 生成式引擎优化 (GEO)

---

## 📊 当前架构评估

### ✅ 已符合的最佳实践

| 项目 | 状态 | 说明 |
|------|------|------|
| **语义化 HTML** | ✅ | 使用 `<article>`, `<header>`, `<nav>`, `<main>`, `<footer>` |
| **响应式设计** | ✅ | 完整的移动端适配 (sm/md/lg breakpoints) |
| **清晰的信息架构** | ✅ | 分类明确 (入门/进阶/认知) |
| **内部链接** | ✅ | 文章间导航 + 最新文章推荐 |
| **加载速度** | ✅ | Vite 构建 + 代码分割 (markdown chunk) |
| **HTTPS** | ✅ | 服务器已配置 SSL |
| **结构化内容** | ✅ | Markdown + Frontmatter 元数据 |
| **搜索功能** | ✅ | 客户端搜索 (Fuse.js) |

---

### ⚠️ 需要优化的关键项

#### 1️⃣ **SEO 元数据不完整** (优先级：🔴 高)

**问题：**
- ❌ 缺少 `og:title`, `og:description`, `og:image` (Open Graph)
- ❌ 缺少 `twitter:card`, `twitter:title` (Twitter Card)
- ❌ 缺少 `canonical` 链接
- ❌ 缺少 `robots` meta
- ❌ 每篇文章没有独立的 meta 描述
- ❌ 缺少 `article:published_time`, `article:author`

**影响：** 社交媒体分享时无法显示精美预览，搜索引擎无法准确理解页面内容

---

#### 2️⃣ **缺少结构化数据 (Schema.org)** (优先级：🔴 高)

**问题：**
- ❌ 没有 JSON-LD 结构化数据
- ❌ 搜索引擎无法识别文章类型、作者、发布时间

**影响：** 无法在搜索结果中显示丰富摘要 (Rich Snippets)

---

#### 3️⃣ **SPA 路由 SEO 问题** (优先级：🟡 中)

**问题：**
- ❌ React Router 客户端路由，搜索引擎可能无法正确索引
- ❌ 每个页面共享同一个 `index.html`，meta 标签无法动态更新
- ❌ 没有服务端渲染 (SSR) 或静态生成 (SSG)

**影响：** 搜索引擎可能只索引首页，文章页面收录不完整

---

#### 4️⃣ **缺少 Sitemap 和 robots.txt** (优先级：🟡 中)

**问题：**
- ❌ 没有 `sitemap.xml` 提交给搜索引擎
- ❌ 没有 `robots.txt` 指导爬虫行为

**影响：** 搜索引擎发现页面效率低

---

#### 5️⃣ **内容可访问性** (优先级：🟡 中)

**问题：**
- ❌ 缺少 `lang` 属性细化（当前只有 `zh-CN`）
- ❌ 图片没有 `alt` 文本（如果有图片）
- ❌ 缺少跳过导航链接 (skip link)
- ❌ 焦点状态不完整

---

#### 6️⃣ **核心 Web 指标** (优先级：🟢 低)

**问题：**
- ⚠️ 首屏加载依赖 JavaScript
- ⚠️ 没有预加载关键资源
- ⚠️ 没有使用 WebP/AVIF 等现代图片格式

---

## 🎯 AEO/GEO 优化方案

### 方案 A：快速优化（1-2 小时，无需重构）

**适合：** 保持当前架构，快速提升 SEO

#### 1. 增强 index.html meta 标签

```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- 基础 SEO -->
  <meta name="description" content="OpenClaw 饲养日记 - 记录 AI 驯养过程中的点点滴滴" />
  <meta name="keywords" content="OpenClaw,AI 助手，自动化，爬虫，企业微信，AI 教程" />
  <meta name="author" content="Jason Kao" />
  <meta name="robots" content="index, follow" />
  <link rel="canonical" href="https://ocnote.bvmcreative.com/" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://ocnote.bvmcreative.com/" />
  <meta property="og:title" content="OpenClaw 饲养日记" />
  <meta property="og:description" content="记录 AI 驯养过程中的点点滴滴" />
  <meta property="og:image" content="https://ocnote.bvmcreative.com/og-image.jpg" />
  <meta property="og:locale" content="zh_CN" />
  <meta property="og:site_name" content="OpenClaw 饲养日记" />
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="https://ocnote.bvmcreative.com/" />
  <meta name="twitter:title" content="OpenClaw 饲养日记" />
  <meta name="twitter:description" content="记录 AI 驯养过程中的点点滴滴" />
  <meta name="twitter:image" content="https://ocnote.bvmcreative.com/og-image.jpg" />
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <title>OpenClaw 饲养日记</title>
</head>
```

#### 2. 添加 JSON-LD 结构化数据

在 `index.html` 添加：

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "OpenClaw 饲养日记",
  "url": "https://ocnote.bvmcreative.com/",
  "description": "记录 AI 驯养过程中的点点滴滴",
  "author": {
    "@type": "Person",
    "name": "Jason Kao",
    "url": "https://github.com/bvmjason"
  },
  "publisher": {
    "@type": "Organization",
    "name": "BVM Creative",
    "logo": {
      "@type": "ImageObject",
      "url": "https://ocnote.bvmcreative.com/logo.png"
    }
  }
}
</script>
```

在文章页面动态注入（ArticlePage.tsx）：

```tsx
// 在组件内添加
useEffect(() => {
  if (article) {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": article.title.replace(/[🐾📓📰🛠️💬🤖🕷️📊💡🎯📝🔥🎉✅❌⚠️]/g, '').trim(),
      "description": article.description,
      "datePublished": article.date || '2026-03-14',
      "author": {
        "@type": "Person",
        "name": "Jason Kao"
      },
      "publisher": {
        "@type": "Organization",
        "name": "BVM Creative",
        "logo": {
          "@type": "ImageObject",
          "url": "https://ocnote.bvmcreative.com/logo.png"
        }
      }
    })
    document.head.appendChild(script)
    return () => { document.head.removeChild(script) }
  }
}, [article])
```

#### 3. 创建 sitemap.xml

在项目根目录创建 `public/sitemap.xml`：

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ocnote.bvmcreative.com/</loc>
    <lastmod>2026-03-29</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ocnote.bvmcreative.com/news</loc>
    <lastmod>2026-03-29</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ocnote.bvmcreative.com/crawler</loc>
    <lastmod>2026-03-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ocnote.bvmcreative.com/commands</loc>
    <lastmod>2026-03-29</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <!-- 文章页面 -->
  <url>
    <loc>https://ocnote.bvmcreative.com/article/model-selection</loc>
    <lastmod>2026-03-29</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <!-- ... 其他文章 -->
</urlset>
```

#### 4. 创建 robots.txt

在项目根目录创建 `public/robots.txt`：

```txt
User-agent: *
Allow: /

Sitemap: https://ocnote.bvmcreative.com/sitemap.xml
```

---

### 方案 B：中期优化（1-2 天，部分重构）

**适合：** 显著提升 SEO 和 AEO 效果

#### 1. 迁移到 Vite SSR 或 Astro

**推荐 Astro** - 专为内容网站设计，零 JS 输出：

```bash
# 创建新项目
npm create astro@latest ocnote-astro
cd ocnote-astro
npx astro add react
```

**优势：**
- ✅ 静态生成 (SSG) - 每个页面是独立 HTML
- ✅ 自动 SEO 优化
- ✅ 零 JavaScript 输出（默认）
- ✅ 内置 sitemap 生成
- ✅ 更好的 Core Web Vitals

**迁移工作量：** 中等（组件可复用）

---

#### 2. 实现动态 Meta 标签

使用 `react-helmet-async`：

```bash
pnpm add react-helmet-async
```

在 ArticlePage.tsx：

```tsx
import { Helmet } from 'react-helmet-async'

<Helmet>
  <title>{article.title} | OpenClaw 饲养日记</title>
  <meta name="description" content={article.description} />
  <meta property="og:title" content={article.title} />
  <meta property="og:description" content={article.description} />
  <meta property="og:type" content="article" />
  <meta property="article:published_time" content={article.date} />
  <meta property="article:author" content="Jason Kao" />
  <link rel="canonical" href={`https://ocnote.bvmcreative.com/article/${article.id}`} />
</Helmet>
```

---

### 方案 C：长期优化（1-2 周，完整重构）

**适合：** 企业级 SEO 需求

#### 1. 迁移到 Next.js

**优势：**
- ✅ 完整 SSR/SSG 支持
- ✅ 自动代码分割
- ✅ 图片优化
- ✅ 国际化支持
- ✅ API Routes

**工作量：** 大（需要重构路由和数据加载）

---

## 📋 推荐执行计划

### 第一阶段：快速优化（今天完成）

| 任务 | 预计时间 | 优先级 |
|------|---------|--------|
| 1. 增强 index.html meta 标签 | 15 分钟 | 🔴 高 |
| 2. 添加 JSON-LD 结构化数据 | 20 分钟 | 🔴 高 |
| 3. 创建 sitemap.xml | 30 分钟 | 🟡 中 |
| 4. 创建 robots.txt | 5 分钟 | 🟡 中 |
| 5. 创建 og-image.jpg (1200x630) | 30 分钟 | 🟡 中 |

**总计：** 约 2 小时

---

### 第二阶段：中期优化（本周内）

| 任务 | 预计时间 | 优先级 |
|------|---------|--------|
| 1. 安装 react-helmet-async | 10 分钟 | 🟡 中 |
| 2. 实现动态 Meta 标签 | 1 小时 | 🟡 中 |
| 3. 添加文章目录 (TOC) | 2 小时 | 🟢 低 |
| 4. 添加阅读进度条 | 1 小时 | 🟢 低 |

**总计：** 约 4-5 小时

---

### 第三阶段：架构升级（可选）

| 任务 | 预计时间 | 优先级 |
|------|---------|--------|
| 1. 评估 Astro 迁移 | 2 小时 | 🟢 低 |
| 2. 完整迁移到 Astro | 2-3 天 | 🟢 低 |

---

## 🎯 AEO/GEO 核心原则

### 答案引擎优化 (AEO)

1. **直接回答问题** - 每篇文章开头明确核心观点
2. **结构化内容** - 使用标题层级 (H1→H2→H3)
3. **FAQ 格式** - 在文章末尾添加常见问题
4. **简洁定义** - 关键概念用 1-2 句清晰定义
5. **列表和表格** - 便于 AI 提取结构化信息

### 生成式引擎优化 (GEO)

1. **权威性信号** - 引用来源、数据、案例
2. **多样性表达** - 同一概念多种表述方式
3. **上下文完整** - 提供背景、原因、影响
4. **更新频率** - 定期更新旧内容
5. **用户意图匹配** - 覆盖信息型、导航型、交易型查询

---

## ✅ 检查清单

### 基础 SEO
- [ ] Meta description (每页独立)
- [ ] Title tag (每页独立，<60 字符)
- [ ] Canonical URL
- [ ] Robots meta
- [ ] Open Graph 标签
- [ ] Twitter Card 标签

### 结构化数据
- [ ] WebSite Schema
- [ ] Article Schema (每篇文章)
- [ ] BreadcrumbList Schema
- [ ] Organization Schema

### 技术 SEO
- [ ] sitemap.xml
- [ ] robots.txt
- [ ] HTTPS
- [ ] 移动端友好
- [ ] 页面加载速度 <3s
- [ ] 404 页面

### 内容优化
- [ ] H1-H6 层级清晰
- [ ] 内部链接网络
- [ ] 图片 Alt 文本
- [ ] 内容长度 >1000 字
- [ ] 定期更新

---

## 📊 预期效果

**完成第一阶段后：**
- ✅ 社交媒体分享显示精美预览
- ✅ 搜索引擎更好理解网站结构
- ✅ 文章页面可能被收录

**完成第二阶段后：**
- ✅ 每篇文章独立 SEO 优化
- ✅ 搜索结果可能显示丰富摘要
- ✅ 点击率提升 20-30%

**完成第三阶段后：**
- ✅ 完整的 SSR/SSG 支持
- ✅ 最佳 Core Web Vitals 分数
- ✅ 搜索引擎收录最大化

---

**建议：** 先执行第一阶段（2 小时），观察效果后再决定是否继续优化。
