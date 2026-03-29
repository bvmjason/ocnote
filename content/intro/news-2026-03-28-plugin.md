---
id: news-2026-03-28-plugin-system
title: "OpenClaw 插件系统升级，支持动态加载第三方 MCP 服务"
description: "新增插件热加载功能，无需重启 Gateway 即可安装/卸载 MCP 服务，支持 HTTP 和 stdio 传输"
category: news
order: 99
readTime: "4 分钟"
date: "2026-03-28"
source: "OpenClaw Discord"
sourceUrl: "https://discord.com/invite/clawd"
---

## 📰 新闻重点

**核心更新：**
- 插件系统支持热加载，无需重启 Gateway
- 新增 HTTP 传输方式（之前仅支持 stdio）
- 支持动态安装/卸载 MCP 服务
- 插件市场上线，可一键安装常用服务

**新增 MCP 服务：**
- WebSearch（阿里百炼搜索）
- WebParser（网页解析）
- Code Interpreter（代码执行）
- AMap（高德地图）

---

## 💡 观点

**这是架构级升级**

之前的问题：
- 每次安装插件都要重启 Gateway
- 配置复杂，需要手动编辑 JSON
- 插件故障可能导致 Gateway 崩溃

现在的改进：
- 插件独立进程，故障不影响 Gateway
- 一键安装，自动配置
- 支持插件版本管理

**生态意义**
- 降低开发者发布插件门槛
- 用户可以快速尝试新工具
- 形成插件生态正循环

---

## 🎯 对 OpenClaw 用户的建议

**立即行动：**
1. 更新到最新版本
2. 运行 `openclaw plugins list` 查看可用插件
3. 安装常用插件：
   ```bash
   openclaw plugins install WebSearch
   openclaw plugins install WebParser
   ```

**推荐插件组合：**
- **内容创作者：** WebSearch + WebParser
- **开发者：** Code Interpreter + GitHub
- **数据分析师：** WebSearch + Code Interpreter

**注意事项：**
- 插件来源需可信（优先官方市场）
- 敏感数据插件需审查代码
- 定期更新插件获取安全修复

---

**来源：** OpenClaw Discord  
**发布日期：** 2026-03-28
