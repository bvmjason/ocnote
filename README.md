# 🐾 OpenClaw 饲养日记

> AI 对话从入门到入土 - 诙谐版 AI 提示词指南

**技术栈：** Vite + React + TypeScript + Tailwind CSS

---

## 🚀 快速开始

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

访问 http://localhost:5173

---

## 📁 项目结构

```
ai-conversation-guide/
├── src/
│   ├── components/         # React 组件
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── pages/              # 页面组件
│   │   ├── HomePage.tsx
│   │   └── ArticlePage.tsx
│   ├── App.tsx             # 主应用
│   ├── main.tsx            # 入口文件
│   └── index.css           # 全局样式 (Tailwind)
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── tailwind.config.js      # Tailwind 配置
├── vite.config.ts          # Vite 配置
├── tsconfig.json           # TypeScript 配置
└── README.md
```

---

## 🎨 样式定制

所有样式使用 **Tailwind CSS**，在 `tailwind.config.js` 中定制主题：

```js
// 改主色调
theme: {
  extend: {
    colors: {
      primary: {
        500: '#667eea',  // ← 改这个！
        600: '#5a67d8',
      },
    },
  },
}
```

---

## 📝 添加新页面

1. 在 `src/pages/` 创建新组件
2. 在 `src/App.tsx` 添加路由
3. 使用 Tailwind 类写样式

示例：

```tsx
// src/pages/NewPage.tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold text-primary-500">
        新页面
      </h1>
    </div>
  )
}
```

---

## 🛠️ 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| **Vite** | 5.x | 超快的构建工具 |
| **React** | 18.x | UI 框架 |
| **TypeScript** | 5.x | 类型安全 |
| **Tailwind CSS** | 3.x | 原子化 CSS |
| **React Router** | 6.x | 路由管理 |

---

## 📄 License

MIT

---

**🐾 饲养员：** @kaojasonchaoyuan  
**📅 开养日期：** 2026-03-28
