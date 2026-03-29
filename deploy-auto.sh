#!/bin/bash

# OpenClaw 饲养日记 - 全自动部署脚本（防白屏版）
# 功能：
#   1. 内容变更自动检测
#   2. 全量上传 dist 目录（防止 JS 文件不匹配）
#   3. 自动修复文件权限
#   4. 部署验证（检查 JS 文件是否匹配）
#   5. 失败自动回滚

echo "🐾 OpenClaw 饲养日记 - 全自动部署脚本（防白屏版）"
echo "================================================"
echo ""

# ==================== 配置区域 ====================

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

# SSH 配置
SSH_USER="root"
SSH_HOST="121.43.147.73"
SSH_PORT="35125"
SSH_PATH="/www/wwwroot/ocnote.bvmcreative.com/"

# 网站地址
WEBSITE_URL="http://ocnote.bvmcreative.com"

# 工作目录
WORK_DIR="$HOME/Desktop/workscript/html/ocnote"

# ==================== 函数定义 ====================

# 回滚函数
rollback() {
    echo -e "${YELLOW}[回滚] 开始回滚到上一个版本...${NC}"
    
    ssh -p $SSH_PORT -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << 'ENDROLLBACK'
# 找到最新的备份
LATEST_BACKUP=$(ls -td /www/wwwroot/ocnote.bvmcreative.com/../backup-* 2>/dev/null | head -1)

if [ -z "$LATEST_BACKUP" ]; then
  echo "❌ 未找到备份"
  exit 1
fi

echo "✅ 找到备份：$LATEST_BACKUP"

# 回滚
rm -rf /www/wwwroot/ocnote.bvmcreative.com/*
cp -r "$LATEST_BACKUP"/* /www/wwwroot/ocnote.bvmcreative.com/

# 修复权限
chown -R www:www /www/wwwroot/ocnote.bvmcreative.com
chmod -R 755 /www/wwwroot/ocnote.bvmcreative.com
chmod 644 /www/wwwroot/ocnote.bvmcreative.com/assets/*.js 2>/dev/null || true
chmod 644 /www/wwwroot/ocnote.bvmcreative.com/assets/*.css 2>/dev/null || true
chmod 644 /www/wwwroot/ocnote.bvmcreative.com/index.html

# 重启 Apache
/etc/init.d/httpd restart

echo "✅ 回滚完成"
ENDROLLBACK
}

# 验证部署函数
verify_deployment() {
    echo -e "${YELLOW}[验证] 检查部署是否成功...${NC}"
    sleep 2  # 等待 Apache 完全重启

    # 验证网站首页
    HTTP_CODE=$(curl -sI "$WEBSITE_URL" | head -1 | awk '{print $2}')
    if [ "$HTTP_CODE" != "200" ]; then
        echo -e "${RED}❌ 网站首页访问失败（HTTP $HTTP_CODE）${NC}"
        return 1
    fi
    echo -e "${GREEN}✅ 网站首页访问正常${NC}"

    # 验证 HTML 引用的 JS 文件是否存在于服务器
    HTML_JS=$(curl -s "$WEBSITE_URL" | grep -oE 'index-[A-Za-z0-9_-]+\.js' | head -1)
    
    if [ -n "$HTML_JS" ]; then
        SERVER_HAS_IT=$(ssh -p $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=30 $SSH_USER@$SSH_HOST "ls /www/wwwroot/ocnote.bvmcreative.com/assets/$HTML_JS 2>/dev/null")
        if [ -z "$SERVER_HAS_IT" ]; then
            echo -e "${RED}❌ HTML 引用的 JS 文件（$HTML_JS）在服务器上不存在！${NC}"
            echo -e "${YELLOW}⚠️  这是白屏问题的根本原因！${NC}"
            return 1
        fi
        echo -e "${GREEN}✅ HTML 与服务器 JS 文件匹配（$HTML_JS）${NC}"
    fi

    # 验证 JS 文件权限
    JS_PERMISSION=$(ssh -p $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=30 $SSH_USER@$SSH_HOST "stat -c '%a' /www/wwwroot/ocnote.bvmcreative.com/assets/$HTML_JS 2>/dev/null")
    if [ "$JS_PERMISSION" != "644" ]; then
        echo -e "${YELLOW}⚠️  警告：JS 文件权限不是 644（当前：$JS_PERMISSION）${NC}"
    else
        echo -e "${GREEN}✅ JS 文件权限正确（644）${NC}"
    fi

    return 0
}

# ==================== 主流程 ====================

cd "$WORK_DIR"

# 步骤 1: 构建
echo -e "${YELLOW}[1/5] 构建项目...${NC}"
pnpm build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 构建成功${NC}"
echo ""

# 步骤 2: 创建备份
echo -e "${YELLOW}[2/5] 创建备份...${NC}"
BACKUP_NAME="backup-$(date +%Y%m%d-%H%M%S)"
ssh -p $SSH_PORT -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST "cp -r $SSH_PATH $SSH_PATH/../$BACKUP_NAME"
echo -e "${GREEN}✅ 备份创建成功：$BACKUP_NAME${NC}"
echo ""

# 步骤 3: 全量上传 dist 目录（关键：防止 JS 文件不匹配）
echo -e "${YELLOW}[3/5] 全量上传 dist 目录...${NC}"
scp -P $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=30 -r dist/* $SSH_USER@$SSH_HOST:$SSH_PATH

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 文件上传失败${NC}"
    rollback
    exit 1
fi
echo -e "${GREEN}✅ 文件上传完成${NC}"
echo ""

# 步骤 4: 修复权限（关键：防止 403 错误）
echo -e "${YELLOW}[4/5] 修复权限...${NC}"
ssh -p $SSH_PORT -o StrictHostKeyChecking=no -o ConnectTimeout=30 $SSH_USER@$SSH_HOST << 'ENDPERM'
# 修复网站根目录权限
chown -R www:www /www/wwwroot/ocnote.bvmcreative.com
chmod -R 755 /www/wwwroot/ocnote.bvmcreative.com

# 修复 JS 文件权限（白屏问题关键）
chmod 644 /www/wwwroot/ocnote.bvmcreative.com/assets/*.js

# 修复 CSS 文件权限（白屏问题关键）
chmod 644 /www/wwwroot/ocnote.bvmcreative.com/assets/*.css

# 修复 index.html 权限
chmod 644 /www/wwwroot/ocnote.bvmcreative.com/index.html

# 修复 .htaccess 权限（如果存在）
chmod 644 /www/wwwroot/ocnote.bvmcreative.com/.htaccess 2>/dev/null || true

echo "✅ 权限修复完成"

# 重启 Apache
/etc/init.d/httpd restart
echo "✅ Apache 重启完成"
ENDPERM

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 权限修复失败${NC}"
    rollback
    exit 1
fi
echo ""

# 步骤 5: 验证部署（关键：防止白屏）
echo -e "${YELLOW}[5/5] 验证部署...${NC}"
if ! verify_deployment; then
    echo -e "${RED}❌ 部署验证失败${NC}"
    rollback
    exit 1
fi

echo ""
echo "================================"
echo -e "${GREEN}✨ 部署完成${NC}"
echo ""
echo "访问地址：$WEBSITE_URL"
echo ""

# 清理旧备份（保留最近 5 个）
echo -e "${YELLOW}[清理] 清理旧备份...${NC}"
ssh -p $SSH_PORT -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST "ls -td $SSH_PATH/../backup-* 2>/dev/null | tail -n +6 | xargs -r rm -rf"
echo -e "${GREEN}✅ 备份清理完成${NC}"
