# 📦 宝塔部署指南

> 5 分钟完成部署

---

## 🚀 快速部署

### 1. 本地构建

```bash
cd ~/Desktop/workscript/html/ocnote
./deploy.sh
```

或手动执行：

```bash
pnpm install
pnpm build
```

构建完成后，会生成 `dist/` 目录。

---

### 2. 上传到服务器

#### 方式 A：使用宝塔文件管理器

1. 登录宝塔面板
2. 进入文件 → `/www/wwwroot/`
3. 创建网站目录：`aiconversation.guide`
4. 上传 `dist/` 目录内的所有文件

#### 方式 B：使用 SFTP

```bash
# 使用 FileZilla 或 scp 上传
scp -r dist/* root@your-server:/www/wwwroot/aiconversation.guide/
```

---

### 3. 宝塔配置

#### 3.1 创建网站

1. 宝塔面板 → 网站 → 添加站点
2. 填写：
   - **域名**：`aiconversation.guide`（替换为你的域名）
   - **根目录**：`/www/wwwroot/aiconversation.guide`
   - **PHP 版本**：纯静态（选择"纯静态"或"00"）
   - **数据库**：不需要

#### 3.2 配置伪静态

1. 网站 → 设置 → 伪静态
2. 选择"00.Current"
3. 在配置框中添加：

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

4. 保存

#### 3.3 配置 Nginx（可选优化）

1. 网站 → 设置 → 配置文件
2. 粘贴 `nginx.conf` 文件内容
3. 保存

---

### 4. 申请 SSL 证书

1. 网站 → SSL → Let's Encrypt
2. 选择你的域名
3. 点击"申请"
4. 申请成功后，开启"强制 HTTPS"

---

### 5. 验证部署

访问你的域名：`https://aiconversation.guide`

应该能看到网站首页！

---

## 🔧 更新内容

### 修改文章

1. 编辑 `content/` 目录下的 Markdown 文件
2. 本地构建：`pnpm build`
3. 上传 `dist/` 到服务器

### 添加新文章

1. 在 `content/intro/` 或 `content/dimensions/` 创建新 `.md` 文件
2. 添加 Frontmatter：

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
...
```

3. 构建并上传

---

## 📊 性能优化

### 启用 Gzip 压缩

已在 `nginx.conf` 中配置，自动启用。

### 静态资源缓存

已在 `nginx.conf` 中配置，缓存 30 天。

### CDN 加速（可选）

1. 在 Cloudflare 添加你的域名
2. 修改 DNS 记录指向你的服务器
3. 开启 Cloudflare 的 CDN 和缓存

---

## 🐛 常见问题

### 1. 访问出现 404

**原因**：Nginx 未配置 SPA 路由支持

**解决**：
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 2. 页面空白

**原因**：资源路径错误

**解决**：检查 `vite.config.ts` 中的 `base` 配置，确保正确。

### 3. 搜索功能不工作

**原因**：Markdown 文件未正确加载

**解决**：检查 `content/` 目录是否上传完整。

---

## 📈 监控

### 访问日志

```bash
# 查看实时访问日志
tail -f /www/wwwlogs/aiconversation.guide.log
```

### 性能监控

在宝塔面板 → 监控 中查看：
- CPU 使用率
- 内存使用率
- 磁盘空间
- 网络流量

---

## 🎯 下一步

1. ✅ 添加更多文章内容
2. ✅ 配置自定义域名
3. ✅ 启用 HTTPS
4. ✅ 配置 CDN（可选）
5. ✅ 添加网站统计（如 Google Analytics）

---

**部署完成！开始创作内容吧！** 🎉
