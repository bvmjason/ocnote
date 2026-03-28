# 📋 项目规划

**技术栈：** Vite + React + TypeScript + Tailwind CSS ✅  
**更新时间：** 2026-03-28 10:30

---

## ✅ 已完成

- [x] 迁移到 Vite + React + TypeScript
- [x] 配置 Tailwind CSS
- [x] 创建现代化首页
- [x] 创建文章页面模板
- [x] 配置 React Router
- [x] 添加 Inter 字体
- [x] 创建现代化组件（Header/Footer）

---

## 🚀 运行项目

```bash
cd /Users/jasonkao/.openclaw/workspace/ai-conversation-guide
pnpm install
pnpm dev
```

访问：**http://localhost:5173**

---

## 📁 目录结构

```
src/
├── components/       # 可复用组件
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/           # 页面组件
│   ├── HomePage.tsx
│   └── ArticlePage.tsx
├── App.tsx          # 主应用（路由配置）
├── main.tsx         # 入口文件
└── index.css        # Tailwind 样式
```

---

## 🎨 样式定制

### 修改主色调

编辑 `tailwind.config.js`：

```js
colors: {
  primary: {
    500: '#667eea',  // ← 改这里
    600: '#5a67d8',
  },
}
```

### 使用 Tailwind 类

```tsx
<div className="bg-primary-500 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all">
  内容
</div>
```

---

## 📝 下一步

### P0 - 高优先级

1. [ ] 安装依赖并测试
2. [ ] 完善入门篇 3 章内容
3. [ ] 创建内容数据文件（用 MDX 或 Markdown）

### P1 - 正常优先级

4. [ ] 六大维度索引页
5. [ ] 案例库页面
6. [ ] 搜索功能

---

## 💡 常用命令

```bash
# 开发
pnpm dev

# 构建
pnpm build

# 预览构建
pnpm preview

# 类型检查
pnpm tsc

# 清理并重新安装
rm -rf node_modules && pnpm install
```

---

**下一步：运行 `pnpm install && pnpm dev` 查看效果！** 🚀
