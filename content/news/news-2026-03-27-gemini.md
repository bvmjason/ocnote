---
id: news-2026-03-27-api
title: "OpenClaw API 网关上线，支持团队协作和权限管理"
description: "OpenClaw 发布 API 网关功能，支持团队共享、权限控制、使用统计，适合企业部署"
category: news
order: 119
readTime: "4 分钟"
date: "2026-03-27"
source: "OpenClaw Docs"
sourceUrl: "https://docs.openclaw.ai/api-gateway"
---

## 📰 新闻重点

**核心更新：**
- 新增 API 网关功能
- 支持团队共享模型配额
- 支持权限控制（RBAC）
- 支持使用统计和审计
- 支持速率限制

**权限层级：**
- 管理员：完全控制
- 开发者：调用 API + 配置
- 用户：仅调用 API

---

## 💡 观点

**企业级功能**

API 网关价值：
1. **成本优化** - 团队共享配额更经济
2. **安全管控** - 权限分离，降低风险
3. **使用透明** - 清楚知道谁用了什么

**适合场景：**
- 企业 AI 平台
- 团队协作开发
- 多项目管理

---

## 🎯 对 OpenClaw 用户的建议

**配置 API 网关：**
1. 运行 `openclaw gateway init`
2. 配置团队成员和权限
3. 设置速率限制和配额

**推荐配置：**
```yaml
gateway:
  rate_limit: 100/分钟
  quota: 10000/天
  roles:
    - admin: 完全控制
    - developer: 开发权限
    - user: 只读权限
```

---

**来源：** OpenClaw Docs  
**发布日期：** 2026-03-27
