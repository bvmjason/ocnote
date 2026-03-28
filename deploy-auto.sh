#!/bin/bash

# OpenClaw 饲养日记 - 全自动部署脚本（含验证）

echo "🐾 OpenClaw 饲养日记 - 全自动部署脚本"
echo "======================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
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

cd ~/Desktop/workscript/html/ocnote

# 1. 构建
echo -e "${YELLOW}[1/6] 构建项目...${NC}"
pnpm build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ 构建失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 构建成功${NC}"
echo ""

# 2. 创建 tar.gz 压缩包
echo -e "${YELLOW}[2/6] 创建压缩包...${NC}"
TEMP_TAR="ocnote-dist-$(date +%Y%m%d).tar.gz"
cd dist
tar -czvf "$TEMP_TAR" --exclude="$TEMP_TAR" .
cd ..
echo -e "${GREEN}✅ 打包完成${NC}"
echo ""

# 3. FTP 上传
echo -e "${YELLOW}[3/6] FTP 上传...${NC}"
curl -T "dist/$TEMP_TAR" "ftp://$FTP_HOST:$FTP_PORT/$TEMP_TAR" --user "$FTP_USER:$FTP_PASS" --retry 3

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 上传成功${NC}"
else
    echo -e "${YELLOW}⚠️ FTP 上传失败，尝试 SSH 直接复制...${NC}"
    # 备用方案：通过 SSH 直接复制
    scp -P $SSH_PORT -o StrictHostKeyChecking=no "dist/$TEMP_TAR" $SSH_USER@$SSH_HOST:/root/
fi
echo ""

# 4. SSH 解压并配置
echo -e "${YELLOW}[4/6] SSH 远程部署...${NC}"
ssh -p $SSH_PORT -o StrictHostKeyChecking=no $SSH_USER@$SSH_HOST << 'ENDSSH'
cd /www/wwwroot/ocnote.bvmlab.com/

# 查找并解压最新压缩包
LATEST_TAR=$(ls -t ~/ocnote-dist-*.tar.gz 2>/dev/null | head -1)
if [ -z "$LATEST_TAR" ]; then
  LATEST_TAR=$(ls -t /www/wwwroot/ocnote.bvmlab.com/ocnote-dist-*.tar.gz 2>/dev/null | head -1)
fi

if [ -n "$LATEST_TAR" ]; then
  tar -xzf $LATEST_TAR
  rm -f $LATEST_TAR
fi

# 创建 .htaccess（如果不存在或为空）
if [ ! -s .htaccess ]; then
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
fi

# 设置权限
chown -R www:www .
chmod -R 755 .

echo "✅ 部署完成"
ENDSSH

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 部署成功${NC}"
else
    echo -e "${RED}❌ 部署失败${NC}"
    exit 1
fi
echo ""

# 5. 推送到 Git
echo -e "${YELLOW}[5/6] 推送到 GitHub 和 Gitee...${NC}"
git add .
git commit -m "chore: 自动部署"
git push origin main
git push gitee main
echo -e "${GREEN}✅ Git 推送成功${NC}"
echo ""

# 6. 验证网站
echo -e "${YELLOW}[6/6] 验证网站...${NC}"
sleep 3

# 检查首页
HTTP_CODE=$(curl -o /dev/null -s -w "%{http_code}" $WEBSITE_URL)
if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ 网站访问正常 (HTTP $HTTP_CODE)${NC}"
else
    echo -e "${RED}❌ 网站访问异常 (HTTP $HTTP_CODE)${NC}"
fi

# 检查新文章
if curl -s $WEBSITE_URL | grep -q "模型的对比与选择"; then
    echo -e "${GREEN}✅ 新文章已显示${NC}"
else
    echo -e "${YELLOW}⚠️  新文章可能未显示${NC}"
fi

# 清理
rm -f "dist/$TEMP_TAR"

echo ""
echo "================================"
echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo "访问地址：$WEBSITE_URL"
echo ""
