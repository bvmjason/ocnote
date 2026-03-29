#!/bin/bash

# OpenClaw 饲养日记 - 全自动部署脚本（增强版）
# 功能：
#   1. 内容变更自动检测（检测 content/intro/ 目录的 markdown 文件变化）
#   2. 部署失败通知机制（企业微信 webhook 通知）
#   3. 回滚机制（保留上一个版本的备份，部署失败时自动回滚）
#   4. 优化的错误处理和日志记录

echo "🐾 OpenClaw 饲养日记 - 全自动部署脚本（增强版）"
echo "================================================"
echo ""

# ==================== 配置区域 ====================

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# FTP 配置
FTP_HOST="121.43.147.73"
FTP_PORT="21"
FTP_USER="ocnote"
FTP_PASS="wAG4wJwM2Ei7"

# SSH 配置
SSH_USER="root"
SSH_HOST="121.43.147.73"
SSH_PORT="35125"
SSH_PATH="/www/wwwroot/ocnote.bvmlab.com/"

# 网站地址
WEBSITE_URL="http://ocnote.bvmcreative.com"

# 企业微信 Webhook 通知配置（可选）
# 如果没有配置 webhook，将跳过通知
WEBHOOK_URL=""  # 在此填写企业微信机器人 webhook URL

# 工作目录
WORK_DIR="$HOME/Desktop/workscript/html/ocnote"
BACKUP_DIR="$WORK_DIR/backups"
CONTENT_DIR="$WORK_DIR/content/intro"
CHECKSUM_FILE="$WORK_DIR/.content_checksum"

# ==================== 函数定义 ====================

# 发送通知函数
send_notification() {
    local status="$1"
    local message="$2"
    local timestamp=$(date "+%Y-%m-%d %H:%M:%S")
    
    if [ -z "$WEBHOOK_URL" ]; then
        echo -e "${YELLOW}⚠️  通知未配置（WEBHOOK_URL 为空）${NC}"
        return 0
    fi
    
    local content="{
        \"msgtype\": \"markdown\",
        \"markdown\": {
            \"content\": \"**OpenClaw 饲养日记部署通知**\\n> 状态：${status}\\n> 时间：${timestamp}\\n> 详情：${message}\\n\"
        }
    }"
    
    curl -s -H "Content-Type: application/json" -X POST -d "$content" "$WEBHOOK_URL" > /dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 通知已发送${NC}"
    else
        echo -e "${RED}❌ 通知发送失败${NC}"
    fi
}

# 计算内容目录的 checksum
calculate_content_checksum() {
    if [ ! -d "$CONTENT_DIR" ]; then
        echo ""
        return
    fi
    
    # 计算所有 markdown 文件的 checksum（兼容 macOS 和 Linux）
    local checksum_cmd=""
    if command -v md5sum &> /dev/null; then
        # Linux
        checksum_cmd="md5sum"
    elif command -v openssl &> /dev/null; then
        # macOS with openssl
        checksum_cmd="openssl_md5"
    elif command -v shasum &> /dev/null; then
        # macOS fallback
        checksum_cmd="shasum"
    else
        echo ""
        return
    fi
    
    if [ "$checksum_cmd" = "openssl_md5" ]; then
        find "$CONTENT_DIR" -name "*.md" -type f -exec openssl md5 {} \; 2>/dev/null | sort | openssl md5 | awk '{print $2}'
    elif [ "$checksum_cmd" = "shasum" ]; then
        find "$CONTENT_DIR" -name "*.md" -type f -exec shasum -a 256 {} \; 2>/dev/null | sort | shasum -a 256 | awk '{print $1}'
    else
        find "$CONTENT_DIR" -name "*.md" -type f -exec md5sum {} \; 2>/dev/null | sort | md5sum | awk '{print $1}'
    fi
}

# 检查内容是否变更
check_content_changed() {
    local current_checksum=$(calculate_content_checksum)
    
    if [ ! -f "$CHECKSUM_FILE" ]; then
        echo -e "${YELLOW}⚠️  首次部署，无历史 checksum${NC}"
        echo "$current_checksum" > "$CHECKSUM_FILE"
        return 0  # 返回 true，需要部署
    fi
    
    local last_checksum=$(cat "$CHECKSUM_FILE")
    
    if [ "$current_checksum" = "$last_checksum" ]; then
        echo -e "${BLUE}ℹ️  内容未变更，跳过部署${NC}"
        return 1  # 返回 false，不需要部署
    else
        echo -e "${GREEN}✅ 检测到内容变更${NC}"
        echo "$current_checksum" > "$CHECKSUM_FILE"
        return 0  # 返回 true，需要部署
    fi
}

# 创建备份
create_backup() {
    local backup_name="backup-$(date +%Y%m%d-%H%M%S)"
    local backup_path="$BACKUP_DIR/$backup_name"
    
    echo -e "${YELLOW}[备份] 创建备份：$backup_name${NC}"
    
    mkdir -p "$BACKUP_DIR"
    
    # 通过 SSH 创建远程备份
    ssh -p $SSH_PORT -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << ENDBACKUP
if [ -d "$SSH_PATH" ]; then
    cp -r $SSH_PATH $SSH_PATH/../${backup_name}
    echo "✅ 远程备份创建成功：${backup_name}"
else
    echo "⚠️ 网站目录不存在，跳过备份"
fi
ENDBACKUP
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 备份成功${NC}"
        return 0
    else
        echo -e "${RED}❌ 备份失败${NC}"
        return 1
    fi
}

# 回滚函数
rollback() {
    echo -e "${YELLOW}[回滚] 开始回滚到上一个版本...${NC}"
    
    # 获取最新的备份
    local latest_backup=$(ssh -p $SSH_PORT -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST "ls -td $SSH_PATH/../backup-* 2>/dev/null | head -1")
    
    if [ -z "$latest_backup" ]; then
        echo -e "${RED}❌ 未找到备份，无法回滚${NC}"
        send_notification "🔴 部署失败 - 回滚失败" "未找到可用的备份版本"
        return 1
    fi
    
    echo -e "${BLUE}ℹ️  回滚到：$latest_backup${NC}"
    
    # 执行回滚
    ssh -p $SSH_PORT -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << ENDROLLBACK
# 备份当前失败版本（以防万一）
if [ -d "$SSH_PATH" ]; then
    mv $SSH_PATH ${SSH_PATH}.failed-$(date +%Y%m%d-%H%M%S)
fi

# 恢复备份
cp -r $latest_backup $SSH_PATH

# 设置权限
chown -R www:www $SSH_PATH
chmod -R 755 $SSH_PATH

echo "✅ 回滚完成"
ENDROLLBACK
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 回滚成功${NC}"
        send_notification "🟡 部署失败 - 已回滚" "部署失败，已自动回滚到上一个版本"
        return 0
    else
        echo -e "${RED}❌ 回滚失败${NC}"
        send_notification "🔴 部署失败 - 回滚失败" "回滚操作失败，请手动处理"
        return 1
    fi
}

# 清理旧备份（保留最近 5 个）
cleanup_old_backups() {
    echo -e "${YELLOW}[清理] 清理旧备份...${NC}"
    
    ssh -p $SSH_PORT -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << ENDCLEANUP
# 保留最近 5 个备份
ls -td $SSH_PATH/../backup-* 2>/dev/null | tail -n +6 | xargs -r rm -rf
echo "✅ 备份清理完成"
ENDCLEANUP
}

# ==================== 主流程 ====================

cd "$WORK_DIR"

# 步骤 0: 检查内容变更
echo -e "${BLUE}[0/7] 检查内容变更...${NC}"
if ! check_content_changed; then
    echo ""
    echo "================================"
    echo -e "${GREEN}✨ 无需部署（内容未变更）${NC}"
    echo ""
    exit 0
fi
echo ""

# 步骤 1: 构建
echo -e "${YELLOW}[1/7] 构建项目...${NC}"
pnpm build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败${NC}"
    send_notification "🔴 部署失败" "构建阶段失败"
    exit 1
fi
echo -e "${GREEN}✅ 构建成功${NC}"
echo ""

# 步骤 2: 创建备份（回滚机制）
echo -e "${YELLOW}[2/7] 创建备份...${NC}"
create_backup
echo ""

# 步骤 3: 创建 tar.gz 压缩包
echo -e "${YELLOW}[3/7] 创建压缩包...${NC}"
TEMP_TAR="ocnote-dist-$(date +%Y%m%d-%H%M%S).tar.gz"
cd dist
tar -czvf "$TEMP_TAR" --exclude="$TEMP_TAR" .
cd ..
echo -e "${GREEN}✅ 打包完成：$TEMP_TAR${NC}"
echo ""

# 步骤 4: FTP 上传
echo -e "${YELLOW}[4/7] FTP 上传...${NC}"
curl -T "dist/$TEMP_TAR" "ftp://$FTP_HOST:$FTP_PORT/$TEMP_TAR" --user "$FTP_USER:$FTP_PASS" --retry 3 --connect-timeout 30

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 上传成功${NC}"
else
    echo -e "${YELLOW}⚠️  FTP 上传失败，尝试 SSH 直接复制...${NC}"
    # 备用方案：通过 SSH 直接复制
    scp -P $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=30 "dist/$TEMP_TAR" $SSH_USER@$SSH_HOST:/root/
    
    if [ $? -ne 0 ]; then
        echo -e "${RED}❌ 文件传输失败${NC}"
        send_notification "🔴 部署失败" "文件传输阶段失败"
        rollback
        exit 1
    fi
fi
echo ""

# 步骤 5: SSH 解压并配置
echo -e "${YELLOW}[5/7] SSH 远程部署...${NC}"
ssh -p $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=30 $SSH_USER@$SSH_HOST << ENDSSH
cd $SSH_PATH

# 查找并解压最新压缩包（多个位置查找）
LATEST_TAR=""

# 1. 先查找当前目录
LATEST_TAR=$(ls -t ./ocnote-dist-*.tar.gz 2>/dev/null | head -1)

# 2. 查找 /root/ 目录
if [ -z "$LATEST_TAR" ]; then
  LATEST_TAR=$(ls -t /root/ocnote-dist-*.tar.gz 2>/dev/null | head -1)
fi

# 3. 查找 home 目录
if [ -z "$LATEST_TAR" ]; then
  LATEST_TAR=$(ls -t /home/*/ocnote-dist-*.tar.gz 2>/dev/null | head -1)
fi

# 4. 查找网站根目录的上级
if [ -z "$LATEST_TAR" ]; then
  LATEST_TAR=$(ls -t $SSH_PATH/../ocnote-dist-*.tar.gz 2>/dev/null | head -1)
fi

if [ -n "$LATEST_TAR" ]; then
  echo "解压文件：\$LATEST_TAR"
  # 如果不是绝对路径，转到对应目录
  if [[ ! "$LATEST_TAR" = /* ]]; then
    cd $(dirname "$LATEST_TAR")
    LATEST_TAR=$(basename "$LATEST_TAR")
  fi
  tar -xzf "$LATEST_TAR" -C $SSH_PATH
  rm -f "$LATEST_TAR"
else
  echo "❌ 未找到压缩包"
  ls -la /root/*.tar.gz 2>/dev/null || echo "/root/ 无 tar.gz"
  ls -la $SSH_PATH/../ 2>/dev/null | grep tar.gz || echo "上级目录无 tar.gz"
  exit 1
fi

# 创建 .htaccess（每次都强制创建，确保正确）
cat > .htaccess << 'HTACCESS'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
HTACCESS
chmod 644 .htaccess
echo "✅ .htaccess 已创建"

# 设置权限（跳过 .user.ini）
find . -not -name ".user.ini" -exec chown www:www {} \; 2>/dev/null || true
find . -type f -exec chmod 644 {} \; 2>/dev/null || true
find . -type d -exec chmod 755 {} \; 2>/dev/null || true
chmod 755 .htaccess index.html favicon.svg 404.html 2>/dev/null || true
echo "✅ 权限已设置"

echo "✅ 部署完成"
ENDSSH

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 部署失败${NC}"
    send_notification "🔴 部署失败" "SSH 部署阶段失败"
    rollback
    exit 1
fi
echo -e "${GREEN}✅ 部署成功${NC}"
echo ""

# 步骤 6: 推送到 Git
echo -e "${YELLOW}[6/7] 推送到 Git...${NC}"
git add .
git commit -m "chore: 自动部署 $(date +%Y-%m-%d)" > /dev/null 2>&1

if git push origin main 2>/dev/null && git push gitee main 2>/dev/null; then
    echo -e "${GREEN}✅ Git 推送成功${NC}"
else
    echo -e "${YELLOW}⚠️  Git 推送失败（继续执行）${NC}"
fi
echo ""

# 步骤 7: 验证网站
echo -e "${YELLOW}[7/7] 验证网站...${NC}"
sleep 3

# 检查首页
HTTP_CODE=$(curl -o /dev/null -s -w "%{http_code}" --connect-timeout 10 $WEBSITE_URL)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ 网站访问正常 (HTTP $HTTP_CODE)${NC}"
    VERIFICATION_STATUS="✅ 验证通过"
else
    echo -e "${RED}❌ 网站访问异常 (HTTP $HTTP_CODE)${NC}"
    VERIFICATION_STATUS="❌ 验证失败"
    send_notification "🔴 部署失败" "网站验证失败 (HTTP $HTTP_CODE)"
    rollback
    exit 1
fi

# 检查新文章（可选）
if curl -s --connect-timeout 10 $WEBSITE_URL | grep -q "模型"; then
    echo -e "${GREEN}✅ 内容已显示${NC}"
else
    echo -e "${YELLOW}⚠️  内容可能未显示（继续）${NC}"
fi

# 清理本地临时文件
rm -f "dist/$TEMP_TAR"

# 清理旧备份
cleanup_old_backups

echo ""
echo "================================"
echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo "访问地址：$WEBSITE_URL"
echo "验证状态：$VERIFICATION_STATUS"
echo ""

# 发送成功通知
send_notification "🟢 部署成功" "网站已更新，访问地址：$WEBSITE_URL"

exit 0
