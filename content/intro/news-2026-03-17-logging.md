---
id: news-2026-03-17-logging
title: "OpenClaw 日志系统升级，支持结构化日志和日志分析"
description: "OpenClaw 日志系统升级，支持结构化日志、日志搜索、异常检测，便于问题排查和审计"
category: news
order: 140
readTime: "3 分钟"
date: "2026-03-17"
source: "OpenClaw Docs"
sourceUrl: "https://docs.openclaw.ai/logging"
---

## 📰 新闻重点

**核心更新：**
- 日志系统升级
- 支持结构化日志（JSON 格式）
- 支持日志搜索
- 支持异常检测
- 支持日志导出

**日志级别：**
- DEBUG：调试信息
- INFO：正常运行信息
- WARN：警告信息
- ERROR：错误信息

---

## 💡 观点

**运维必备工具**

日志系统价值：
1. **问题排查** - 快速定位问题
2. **安全审计** - 记录所有操作
3. **性能分析** - 发现性能瓶颈

**使用场景：**
- 错误排查
- 安全审计
- 性能优化

---

## 🎯 对 OpenClaw 用户的建议

**配置日志系统：**
1. 运行 `openclaw logging init`
2. 配置日志级别和存储
3. 设置日志保留策略

**推荐配置：**
```yaml
logging:
  level: INFO
  format: json
  retention: 90  # 保留 90 天
```

---

**来源：** OpenClaw Docs  
**发布日期：** 2026-03-17
