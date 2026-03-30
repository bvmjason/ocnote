---
id: news-2026-03-20-wecom
title: "OpenClaw 企业微信插件发布，支持消息发送和待办管理"
description: "新增企业微信插件，支持发送消息、创建待办、查询日程、管理会议等企业微信功能"
category: news
order: 91
readTime: "4 分钟"
date: "2026-03-20"
source: "GitHub Releases"
sourceUrl: "https://github.com/openclaw/openclaw/releases"
---

## 📰 新闻重点

**核心更新：**
- 新增企业微信插件
- 支持发送消息（文本/图片/文件）
- 支持待办管理（创建/更新/删除）
- 支持日程管理（查询/创建/修改）
- 支持会议管理（创建/取消/修改成员）

**支持功能：**
- 消息发送
- 待办事项
- 日程管理
- 会议管理
- 通讯录查询

---

## 💡 观点

**企业办公自动化利器**

使用场景：
- 自动发送日报/周报
- 自动创建会议待办
- 自动查询同事闲忙
- 自动发送会议提醒

**效率提升：**
- 减少手动操作 80%
- 消息发送自动化
- 待办跟踪自动化

**安全考虑：**
- 企业数据本地存储
- 支持权限控制
- 敏感操作需确认

---

## 🎯 对 OpenClaw 用户的建议

**配置企业微信：**
1. 获取企业微信 Corp ID 和 Secret
2. 运行 `openclaw configure --provider wecom`
3. 配置应用 ID 和接收人
4. 测试消息发送

**推荐用法：**
- **日报提醒：** 每天 22 点自动发送
- **会议通知：** 会议前 15 分钟提醒
- **待办分配：** 自动创建并分配待办

**常用命令：**
```bash
# 发送消息
openclaw wecom send --to "kaojason" --msg "你好"

# 创建待办
openclaw wecom todo create --title "完成任务" --due "2026-03-21"

# 查询日程
openclaw wecom schedule list --date "2026-03-21"
```

---

**来源：** GitHub Releases  
**发布日期：** 2026-03-20
