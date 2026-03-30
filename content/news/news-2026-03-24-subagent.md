---
id: news-2026-03-24-subagent
title: "OpenClaw 子代理系统上线，支持任务自动分配和多 Agent 协作"
description: "新增子代理（subagent）功能，主 Agent 可分配任务给专业子代理，实现多 Agent 协作工作流"
category: news
order: 95
readTime: "5 分钟"
date: "2026-03-24"
source: "OpenClaw Docs"
sourceUrl: "https://docs.openclaw.ai/subagents"
---

## 📰 新闻重点

**核心更新：**
- 新增子代理（subagent）系统
- 主 Agent 可分配任务给专业子代理
- 支持多 Agent 并行执行
- 内置专业子代理模板（爬虫/数据分析/写作）

**子代理类型：**
- **爬虫专家** - 网站爬虫、数据抓取
- **数据分析** - 数据处理、图表生成
- **文档报告** - 文档撰写、PPT 制作
- **客服** - 客户咨询、问题解答

---

## 💡 观点

**多 Agent 协作时代**

之前的局限：
- 单个 Agent 能力有限
- 复杂任务需要多次交互
- 专业任务效果不稳定

现在的突破：
- 主 Agent 负责任务拆解
- 子 Agent 负责专业执行
- 自动汇总结果

**效率提升：**
- 复杂任务时间缩短 50%
- 专业任务质量提升 30%
- 减少人工干预

---

## 🎯 对 OpenClaw 用户的建议

**配置子代理：**
1. 更新到最新版本
2. 查看可用子代理：
   ```bash
   openclaw subagents list
   ```
3. 配置专业子代理：
   ```bash
   openclaw subagents enable crawler
   openclaw subagents enable analyst
   ```

**使用场景：**
- **爬虫任务：** 分配给爬虫专家
- **数据分析：** 分配给数据分析 Agent
- **写报告：** 分配给文档报告 Agent

**最佳实践：**
```
主 Agent：理解需求 → 拆解任务 → 分配 → 汇总
子 Agent：接收任务 → 专业执行 → 返回结果
```

---

**来源：** OpenClaw Docs  
**发布日期：** 2026-03-24
