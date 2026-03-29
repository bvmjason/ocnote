# 🚀 部署脚本增强功能说明

## 新增功能

### 1. 内容变更自动检测 ✅

脚本会自动检测 `content/intro/` 目录下的 markdown 文件变更：

- **工作原理**：使用 MD5 checksum 对比
- **检测文件**：`content/intro/*.md`
- **记录文件**：`.content_checksum`（自动创建）
- **行为**：
  - 如果内容未变更 → 跳过部署，节省时间
  - 如果内容变更 → 继续部署流程
  - 首次部署 → 自动记录 checksum

```bash
# 手动查看当前 checksum
cat .content_checksum
```

---

### 2. 部署失败通知机制 ✅

通过企业微信 Webhook 发送部署状态通知：

- **通知场景**：
  - 🟢 部署成功
  - 🔴 部署失败（各阶段失败）
  - 🟡 部署失败但已回滚
  
- **配置方法**：
  1. 在企业微信群中添加机器人
  2. 获取 Webhook URL
  3. 编辑 `deploy-auto.sh`，设置 `WEBHOOK_URL`：

```bash
# 在脚本顶部配置区域
WEBHOOK_URL="https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=xxx"
```

- **通知格式**：Markdown 格式，包含状态、时间、详情

---

### 3. 回滚机制 ✅

部署失败时自动回滚到上一个版本：

- **备份位置**：服务器 `/www/wwwroot/backup-YYYYMMDD-HHMMSS/`
- **触发条件**：
  - 文件传输失败
  - SSH 部署失败
  - 网站验证失败（HTTP 非 200）
  
- **备份策略**：
  - 每次部署前自动创建备份
  - 保留最近 5 个备份（自动清理旧备份）
  
- **回滚流程**：
  1. 检测失败 → 自动触发回滚
  2. 恢复最新备份
  3. 设置权限
  4. 发送通知

```bash
# 查看服务器上的备份
ssh -p 35125 root@121.43.147.73 "ls -lt /www/wwwroot/backup-*"
```

---

### 4. 脚本优化 ✅

#### 错误处理增强
- 每个阶段都有明确的错误检查
- 失败时自动触发回滚
- 详细的错误日志输出

#### 超时配置
- FTP/SSH 连接超时：30 秒
- 网站验证超时：10 秒
- 避免无限等待

#### 日志输出
- 使用颜色区分不同状态
- 清晰的步骤标识 `[1/7]`, `[2/7]`...
- 关键操作都有成功/失败反馈

#### 代码结构
- 函数化设计，便于维护
- 配置区域集中管理
- 注释清晰

---

## 使用指南

### 快速开始

```bash
cd ~/Desktop/workscript/html/ocnote
./deploy-auto.sh
```

### 配置企业微信通知（可选）

1. **获取 Webhook URL**：
   - 企业微信群 → 机器人 → 添加
   - 复制 Webhook 地址

2. **编辑脚本**：
   ```bash
   vim deploy-auto.sh
   # 修改这一行：
   WEBHOOK_URL="你的 webhook 地址"
   ```

3. **测试通知**：
   ```bash
   # 运行部署脚本，成功/失败都会收到通知
   ./deploy-auto.sh
   ```

---

## 部署流程

```
[0/7] 检查内容变更 ────────→ 无变更则跳过
    ↓
[1/7] 构建项目
    ↓
[2/7] 创建备份 ←─────────── 回滚点
    ↓
[3/7] 创建压缩包
    ↓
[4/7] FTP 上传 → 失败 → 回滚
    ↓
[5/7] SSH 部署 → 失败 → 回滚
    ↓
[6/7] Git 推送
    ↓
[7/7] 网站验证 → 失败 → 回滚
    ↓
✅ 部署完成
```

---

## 故障排查

### 部署失败但无回滚

**原因**：备份创建失败
```bash
# 检查备份目录权限
ssh -p 35125 root@121.43.147.73 "ls -la /www/wwwroot/"
```

### 通知未发送

**原因**：Webhook URL 未配置
```bash
# 检查脚本配置
grep "WEBHOOK_URL" deploy-auto.sh
```

### 内容检测不工作

**原因**：checksum 文件损坏
```bash
# 删除 checksum 文件，重新生成
rm .content_checksum
./deploy-auto.sh
```

---

## 高级用法

### 强制部署（忽略内容检测）

```bash
# 临时删除 checksum 文件
rm .content_checksum
./deploy-auto.sh
```

### 手动回滚

```bash
# 1. 查看可用备份
ssh -p 35125 root@121.43.147.73 "ls -lt /www/wwwroot/backup-*"

# 2. 手动恢复指定备份
ssh -p 35125 root@121.43.147.73 << 'EOF'
cd /www/wwwroot/
cp -r backup-20260328-120000 ocnote.bvmlab.com
chown -R www:www ocnote.bvmlab.com
chmod -R 755 ocnote.bvmlab.com
EOF
```

### 查看部署历史

```bash
# 查看 checksum 变更记录
cat .content_checksum

# 查看 Git 提交历史
git log --oneline -10
```

---

## 注意事项

1. **首次部署**：会创建 checksum 文件，后续部署才会检测变更
2. **备份空间**：保留 5 个备份，约占用 5x 网站大小的磁盘空间
3. **通知频率**：每次部署都会发送通知，避免频繁部署
4. **SSH 密钥**：建议配置 SSH 密钥，避免每次输入密码

---

## 更新日志

### v2.0 - 2026-03-28
- ✅ 新增内容变更自动检测
- ✅ 新增部署失败通知机制
- ✅ 新增回滚机制
- ✅ 优化错误处理和日志输出
- ✅ 添加超时配置
- ✅ 函数化重构

### v1.0 - 初始版本
- 基础部署流程
- FTP + SSH 部署
- Git 推送
- 网站验证
