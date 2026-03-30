---
id: news-2026-03-29-xai
title: "OpenClaw 集成 xAI 搜索，Grok 用户无需手动配置插件"
description: "OpenClaw 将 xAI 提供商迁移到 Responses API，添加原生的 x_search 功能，并自动启用 xAI 插件"
category: news
order: 100
readTime: "3 分钟"
date: "2026-03-29"
source: "GitHub Releases"
sourceUrl: "https://github.com/openclaw/openclaw/releases"
---

## 📰 新闻重点

**核心更新：**
- OpenClaw 将 xAI 提供商迁移到 Responses API
- 添加原生的 `x_search` 模型选择器
- 自动启用 xAI 插件，Grok 用户无需手动配置

**影响范围：**
- 所有使用 Grok 模型的用户
- 需要网络搜索功能的场景

---

## 💡 观点

**这是重大体验优化**

之前 Grok 用户需要：
1. 手动配置插件
2. 设置搜索 API
3. 测试连接

现在只需要：
1. 选择 `x_search` 模型
2. 直接使用

**降低使用门槛**
- 新用户配置时间从 30 分钟 → 5 分钟
- 减少配置错误导致的工单

**技术意义**
- Responses API 是 OpenAI 标准
- 迁移后更容易整合新功能

---

## 🎯 对 OpenClaw 用户的建议

**如果你用 Grok：**
1. 更新到最新版本
2. 运行 `openclaw configure --section web` 重新配置
3. 测试 `x_search` 搜索功能
4. 对比之前的搜索质量

**如果你用其他模型：**
- 不受影响，继续使用现有配置
- 可以考虑切换到 Grok 体验新搜索

**注意事项：**
- x_search 需要有效的 xAI API Key
- 搜索功能按 token 计费
- 建议先小量测试

---

**来源：** GitHub Releases  
**发布日期：** 2026-03-29
