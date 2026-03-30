---
id: news-2026-03-29-rag
title: "OpenClaw 新增 RAG 功能，支持本地知识库问答"
description: "OpenClaw 发布 RAG（检索增强生成）功能，可连接本地文档、网页、数据库，实现精准问答"
category: news
order: 114
readTime: "4 分钟"
date: "2026-03-29"
source: "GitHub Releases"
sourceUrl: "https://github.com/openclaw/openclaw/releases"
---

## 📰 新闻重点

**核心更新：**
- 新增 RAG（检索增强生成）功能
- 支持连接本地文档（PDF/Markdown/TXT）
- 支持网页知识库
- 支持数据库连接
- 实现精准领域问答

**支持数据源：**
- 本地文件
- 网页 URL
- MySQL/PostgreSQL
- Notion/Obsidian

---

## 💡 观点

**解决 AI 幻觉问题**

RAG 的价值：
1. **精准回答** - 基于真实数据而非训练记忆
2. **领域专业** - 可以连接专业知识库
3. **数据可控** - 企业数据不出内网

**使用场景：**
- 企业内部知识库问答
- 产品文档自动回复
- 个人笔记智能搜索

---

## 🎯 对 OpenClaw 用户的建议

**配置 RAG：**
1. 运行 `openclaw rag init`
2. 添加数据源：
   ```bash
   openclaw rag add --type file --path ./docs
   openclaw rag add --type url --url https://docs.openclaw.ai
   ```
3. 测试问答：
   ```bash
   openclaw rag query "如何配置多模型"
   ```

**推荐用法：**
- **个人：** 连接 Obsidian/Notion 笔记
- **团队：** 连接内部文档库
- **企业：** 连接产品文档 + FAQ

---

**来源：** GitHub Releases  
**发布日期：** 2026-03-29
