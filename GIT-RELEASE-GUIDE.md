# OCnote Git 发布逻辑说明

**创建时间：** 2026-03-30  
**问题：** Git 仓库包含构建产物（dist/）和打包文件（*.tar.gz），逻辑混乱

---

## 🐛 问题诊断

### 问题 1：dist 目录被提交到 Git

**现象：**
- `dist/` 目录及其内容被提交到 Git
- 每次构建后 JS/CSS 文件名哈希变化，导致大量 diff
- 线上代码和 Git 不一致

**原因：**
- 没有 `.gitignore` 文件
- 构建产物被错误提交

### 问题 2：打包文件被提交

**现象：**
- `dist.tar`, `dist.tar.gz`, `dist-new.tar.gz`, `dist.zip` 都在 Git 中
- 这些是部署中间文件，不应该提交

**原因：**
- 没有 `.gitignore` 文件
- 打包文件被错误提交

### 问题 3：线上内容与 Git 不一致

**现象：**
- 线上网站有新文章
- Git 仓库没有对应内容

**原因：**
- 直接修改线上文件，没有同步回 Git
- 或者构建了但没提交

---

## ✅ 解决方案

### 步骤 1：创建 .gitignore

已创建 `.gitignore` 文件，排除以下内容：

```
# 构建产物
dist/

# 打包文件
*.tar
*.tar.gz
*.zip

# 依赖
node_modules/

# 系统文件
.DS_Store
```

### 步骤 2：从 Git 中移除 dist 目录

```bash
# 从 Git 缓存中移除 dist（保留本地文件）
git rm -r --cached dist

# 从 Git 中移除打包文件
git rm *.tar *.tar.gz *.zip
```

### 步骤 3：提交清理

```bash
git commit -m "chore: 清理构建产物，添加.gitignore"
```

### 步骤 4：推送到远程

```bash
# 推送到 GitHub
git push origin main

# 推送到 Gitee
git push gitee main
```

---

## 📋 正确的发布流程

### 开发阶段

```bash
# 1. 修改源代码（src/, content/）
# 2. 本地测试
pnpm dev

# 3. 提交源代码
git add src/ content/ public/
git commit -m "feat: 新增文章/功能"
```

### 发布阶段

```bash
# 1. 构建
pnpm build

# 2. 本地验证
pnpm preview

# 3. 部署到服务器（使用 deploy-auto.sh）
./deploy-auto.sh

# 4. 验证线上
curl -I https://ocnote.bvmcreative.com/

# 5. 提交源代码（不是 dist！）
git add src/ content/ public/
git commit -m "chore: 发布新版本"
git push origin main
git push gitee main
```

### 回滚阶段

```bash
# 如果线上有问题，deploy-auto.sh 会自动回滚到上一个备份
# 或者手动回滚：
ssh root@121.43.147.73 "cp -r /www/wwwroot/ocnote.bvmcreative.com/../backup-* /www/wwwroot/ocnote.bvmcreative.com/"
```

---

## 🎯 Git 仓库应该包含什么

### ✅ 应该提交

| 类型 | 路径 | 说明 |
|------|------|------|
| **源代码** | `src/` | React 组件、TypeScript 代码 |
| **内容** | `content/` | Markdown 文章 |
| **公共资源** | `public/` | robots.txt, sitemap.xml, favicon |
| **配置文件** | `package.json`, `vite.config.ts`, `tsconfig.json` |
| **脚本** | `scripts/` | 构建脚本、部署脚本 |
| **文档** | `README.md`, `DEPLOY.md`, `*.md` |

### ❌ 不应该提交

| 类型 | 路径 | 说明 |
|------|------|------|
| **构建产物** | `dist/` | 每次构建都会变化 |
| **打包文件** | `*.tar`, `*.tar.gz`, `*.zip` | 部署中间文件 |
| **依赖** | `node_modules/` | 可以通过 pnpm install 恢复 |
| **系统文件** | `.DS_Store`, `Thumbs.db` | 操作系统生成 |
| **日志** | `*.log` | 运行时生成 |

---

## 📊 当前状态

### Git 仓库清理进度

- [x] 创建 `.gitignore`
- [x] 从 Git 移除 `dist/` 目录
- [x] 从 Git 移除打包文件
- [ ] 提交清理
- [ ] 推送到 GitHub
- [ ] 推送到 Gitee

### 待提交的新内容

| 文件 | 类型 | 说明 |
|------|------|------|
| `content/intro/16-optimize-ai-financial-report.md` | 日记 | 今日日记 |
| `content/intro/news-2026-03-30-*.md` | 新闻 | 3 篇 AI 新闻 |
| `src/lib/content.ts` | 代码 | 添加新文章到 ARTICLE_LIST |
| `src/components/ReadingProgress.tsx` | 代码 | 阅读进度条组件 |
| `public/sitemap.xml` | 配置 | 更新 sitemap |
| `public/rss.xml` | 配置 | 更新 RSS |

---

## 🔄 未来发布流程优化

### 建议 1：自动化发布

```bash
# 一键发布脚本（待开发）
./release.sh

# 功能：
# 1. 构建
# 2. 部署
# 3. 验证
# 4. 提交源代码
# 5. 推送 Git
```

### 建议 2：CI/CD

```yaml
# GitHub Actions（待配置）
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: pnpm install
      - run: pnpm build
      - run: ./deploy-auto.sh
```

### 建议 3：版本管理

```bash
# 使用语义化版本（待实施）
npm version patch  # 0.0.1 -> 0.0.2
npm version minor  # 0.0.2 -> 0.1.0
npm version major  # 0.1.0 -> 1.0.0
```

---

## 📝 操作命令总结

### 清理 Git

```bash
cd /Users/jasonkao/Desktop/workscript/html/ocnote

# 1. 创建.gitignore（已完成）
# 2. 移除 dist
git rm -r --cached dist
# 3. 移除打包文件
git rm *.tar *.tar.gz *.zip
# 4. 提交
git commit -m "chore: 清理构建产物，添加.gitignore"
# 5. 推送
git push origin main
git push gitee main
```

### 发布新版本

```bash
# 1. 构建
pnpm build

# 2. 部署
./deploy-auto.sh

# 3. 提交源代码
git add src/ content/ public/
git commit -m "chore: 发布新版本"
git push origin main
git push gitee main
```

---

**文档版本：** v1.0  
**创建时间：** 2026-03-30  
**维护人：** Jason Kao
