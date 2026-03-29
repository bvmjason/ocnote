---
id: news-2026-03-17-security
title: "OpenClaw 安全审计功能上线，支持权限检查和风险评估"
description: "新增安全审计功能，支持权限检查、敏感操作审计、风险评估，保障 AI 操作安全"
category: news
order: 88
readTime: "4 分钟"
date: "2026-03-17"
source: "GitHub Releases"
sourceUrl: "https://github.com/openclaw/openclaw/releases"
---

## 📰 新闻重点

**核心更新：**
- 新增安全审计功能
- 支持权限检查
- 敏感操作审计日志
- 风险评估报告
- 支持安全策略配置

**安全功能：**
- 权限检查
- 操作审计
- 风险评估
- 敏感数据保护
- 安全策略配置

---

## 💡 观点

**安全是 AI 助手的核心**

之前的风险：
- 权限过大无审计
- 敏感操作无记录
- 数据泄露风险

现在的改进：
- 所有操作有日志
- 敏感操作需确认
- 定期安全审计

**安全建议：**
- 定期运行安全审计
- 审查敏感操作日志
- 限制 AI 权限范围

---

## 🎯 对 OpenClaw 用户的建议

**配置安全审计：**
1. 运行安全审计：
   ```bash
   openclaw security audit
   ```
2. 查看审计报告
3. 修复发现的问题
4. 配置安全策略

**推荐配置：**
```yaml
security:
  require_confirmation:
    - file_delete
    - external_send
    - elevated_command
  audit_log: true
  risk_tolerance: medium
```

**定期检查：**
- 每周查看审计日志
- 每月运行安全审计
- 每季度审查权限配置

---

**来源：** GitHub Releases  
**发布日期：** 2026-03-17
