# 🐾 OpenClaw 饲养日记

> AI 对话从入门到入土 - 诙谐版 AI 提示词指南

**技术栈：** Vite + React + TypeScript + Tailwind CSS + Markdown

---

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build
```

访问 http://localhost:5173

---

## 📁 项目结构

```
ocnote/
├── content/              # 📝 内容目录（Markdown 文件）
│   ├── intro/           # 入门篇文章
│   │   ├── 01-first-chat.md
│   │   └── 02-basic-formula.md
│   └── dimensions/      # 六大维度文章
├── src/
│   ├── components/       # React 组件
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/            # 页面组件
│   │   ├── HomePage.tsx
│   │   └── ArticlePage.tsx
│   ├── lib/              # 工具库
│   │   ├── content.ts    # 内容加载
│   │   └── Search.tsx    # 搜索组件
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css         # Tailwind 样式
├── public/
│   └── favicon.svg
├── dist/                 # 构建输出（上传到服务器）
├── package.json
├── tailwind.config.js
├── vite.config.ts
├── start.sh              # 本地启动脚本
├── deploy.sh             # 部署脚本
└── DEPLOY.md             # 部署文档
```

---

## ✍️ 添加内容

### 1. 创建 Markdown 文件

在 `content/intro/` 或 `content/dimensions/` 创建新文件：

```markdown
---
id: your-article-id
title: "文章标题"
description: "文章描述"
category: intro
order: 3
readTime: "5 分钟"
---

# 文章内容

这里是正文...
```

### 2. 本地预览

```bash
pnpm dev
```

### 3. 构建并部署

```bash
pnpm build
./deploy.sh
```

---

## 🎨 样式定制

编辑 `tailwind.config.js`：

```js
colors: {
  primary: {
    500: '#0ea5e9',  // 主色调
  },
},
```

---

## 🔍 搜索功能

内置前端搜索（Fuse.js），无需后端。

- 搜索标题
- 搜索描述
- 搜索全文内容

---

## 📦 部署

### 宝塔部署

```bash
./deploy.sh
```

按照提示操作，详见 [DEPLOY.md](./DEPLOY.md)

### 部署到其他平台

- **Vercel**: 自动检测 Vite，一键部署
- **Netlify**: 构建命令 `pnpm build`，发布目录 `dist`
- **GitHub Pages**: 使用 `gh-pages` 包

---

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vite** | 5.x | 超快的构建工具 |
| **React** | 18.x | UI 框架 |
| **TypeScript** | 5.x | 类型安全 |
| **Tailwind CSS** | 3.x | 原子化 CSS |
| **React Router** | 6.x | 路由管理 |
| **React Markdown** | 9.x | Markdown 渲染 |
| **Fuse.js** | 7.x | 前端搜索 |

---

## 📊 特性

- ✅ **Markdown 内容** - 独立管理，易编辑
- ✅ **前端搜索** - 快速查找内容
- ✅ **响应式设计** - 完美适配移动端
- ✅ **SEO 友好** - 预渲染 HTML
- ✅ **静态部署** - 零维护成本
- ✅ **持续更新** - 开源社区驱动

---

## 📝 内容规划

### 已完成
- [x] 入门篇 - 第一次和 AI 说话
- [x] 入门篇 - 基础指令公式
- [ ] 入门篇 - 常见翻车现场
- [ ] 六大维度 - 文书
- [ ] 六大维度 - 策划
- [ ] 六大维度 - 撰写
- [ ] 六大维度 - 润色
- [ ] 六大维度 - 编辑
- [ ] 六大维度 - 代码

---

## 🤝 贡献

欢迎提交 Issue 和 PR！

---

## 📄 License

MIT

---

**🐾 饲养员：** @kaojasonchaoyuan  
**📅 开养日期：** 2026-03-28  
**🚀 当前版本：** v1.0.0
