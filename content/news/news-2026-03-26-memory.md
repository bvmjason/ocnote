---
id: news-2026-03-26-memory-system
title: "OpenClaw 记忆系统升级，支持跨会话记忆和记忆搜索"
description: "新增 MEMORY.md 长期记忆功能，支持语义搜索和记忆片段管理，AI 真正拥有"长期记忆""
category: news
order: 97
readTime: "4 分钟"
date: "2026-03-26"
source: "GitHub Releases"
sourceUrl: "https://github.com/openclaw/openclaw/releases"
---

## 📰 新闻重点

**核心更新：**
- 新增 MEMORY.md 长期记忆文件
- 支持跨会话记忆持久化
- 新增记忆搜索功能（语义搜索）
- 支持记忆片段管理（添加/删除/更新）

**记忆层级：**
- **短期记忆** - 当前会话上下文
- **长期记忆** - MEMORY.md 持久化存储
- **记忆搜索** - 快速检索相关记忆

---

## 💡 观点

**解决 AI 失忆问题**

之前的问题：
- 每次新会话 AI 都"失忆"
- 需要重复说明偏好和背景
- 无法积累使用经验

现在的改进：
- 重要信息写入 MEMORY.md
- 新会话自动加载记忆
- AI 越用越懂你

**隐私保护：**
- 记忆文件本地存储
- 可选择性加载（群聊不加载）
- 支持记忆删除

---

## 🎯 对 OpenClaw 用户的建议

**配置记忆系统：**
1. 创建 `MEMORY.md` 文件
2. 记录重要信息：
   - 个人偏好
   - 项目背景
   - 常用指令
   - 重要决策

**记忆管理技巧：**
- 定期整理记忆（删除过期内容）
- 分类记录（用标题分隔）
- 标注日期（便于追溯）

**示例结构：**
```markdown
# 个人偏好
- 幸运数字：4 和 7
- 称呼：主人

# 项目背景
- BVM Creative：技术开发/运维
- 富士 SP 网站：sp.fujifilm.com.cn

# 常用指令
- 部署命令：cd /path && ./deploy.sh
```

---

**来源：** GitHub Releases  
**发布日期：** 2026-03-26
