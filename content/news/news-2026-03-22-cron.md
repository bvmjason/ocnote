---
id: news-2026-03-22-cron
title: "OpenClaw 定时任务系统上线，支持 Cron 表达式和任务管理"
description: "新增定时任务功能，支持标准 Cron 表达式，可配置定时发送消息、执行脚本、检查状态等任务"
category: news
order: 93
readTime: "4 分钟"
date: "2026-03-22"
source: "OpenClaw Docs"
sourceUrl: "https://docs.openclaw.ai/cron"
---

## 📰 新闻重点

**核心更新：**
- 新增定时任务系统
- 支持标准 Cron 表达式
- 支持多种任务类型（消息/脚本/检查）
- 任务管理 CLI（list/add/remove）

**支持任务类型：**
- 定时发送消息（早报/晚报/提醒）
- 定时执行脚本
- 定时检查状态（网站/服务）
- 定时备份数据

---

## 💡 观点

**自动化能力升级**

之前的局限：
- 需要外部工具（crontab/systemd）
- 配置复杂
- 无法发送消息

现在的改进：
- 内置定时任务系统
- 简单配置即可使用
- 直接发送到聊天

**应用场景：**
- 每天早上 8 点发送早报
- 每小时检查工作状态
- 每天 22 点发送日报提醒

---

## 🎯 对 OpenClaw 用户的建议

**配置定时任务：**
1. 查看任务配置文件：`~/.openclaw/cron/jobs.json`
2. 添加任务：
   ```bash
   openclaw cron add --name "早报" --schedule "0 8 * * *"
   ```
3. 查看任务列表：
   ```bash
   openclaw cron list
   ```

**推荐任务配置：**
```json
{
  "name": "早报",
  "schedule": "0 8 * * *",
  "action": "send_message",
  "content": "早上好！今日天气..."
}
```

**常用 Cron 表达式：**
- `0 8 * * *` - 每天早上 8 点
- `0 */2 * * *` - 每 2 小时
- `0 9 * * 1` - 每周一 9 点

---

**来源：** OpenClaw Docs  
**发布日期：** 2026-03-22
