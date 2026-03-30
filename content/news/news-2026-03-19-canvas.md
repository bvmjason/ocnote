---
id: news-2026-03-19-canvas
title: "OpenClaw 画布功能上线，支持网页自动化和 UI 截图"
description: "新增画布（Canvas）功能，支持打开网页、执行 JavaScript、截图、点击等操作，实现网页自动化"
category: news
order: 90
readTime: "4 分钟"
date: "2026-03-19"
source: "OpenClaw Docs"
sourceUrl: "https://docs.openclaw.ai/canvas"
---

## 📰 新闻重点

**核心更新：**
- 新增画布（Canvas）功能
- 支持打开任意网页
- 支持执行 JavaScript
- 支持截图、点击、输入等操作
- 支持网页数据抓取

**支持操作：**
- 打开网页
- 执行 JS 代码
- 截图保存
- 点击元素
- 输入文本
- 获取页面内容

---

## 💡 观点

**网页自动化新工具**

使用场景：
- 自动登录网站
- 自动抓取数据
- 自动填写表单
- 定期截图监控

**与爬虫对比：**
- **画布** - 模拟真人操作，适合动态网页
- **爬虫** - 直接请求接口，适合静态网页

**局限性：**
- 速度较慢（需要加载页面）
- 资源消耗大（需要浏览器）
- 适合少量高频操作

---

## 🎯 对 OpenClaw 用户的建议

**配置画布功能：**
1. 确保安装 Chromium 浏览器
2. 运行 `openclaw configure --section canvas`
3. 测试打开网页：
   ```bash
   openclaw canvas navigate --url "https://example.com"
   ```

**推荐用法：**
- **数据抓取：** 动态网页用画布，静态网页用爬虫
- **自动登录：** 保存 Cookie，避免重复登录
- **定期监控：** 定时截图，监控页面变化

**注意事项：**
- 遵守网站 robots.txt
- 不要高频访问
- 注意账号安全

---

**来源：** OpenClaw Docs  
**发布日期：** 2026-03-19
