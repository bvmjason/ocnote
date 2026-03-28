#!/bin/bash

# OpenClaw 饲养日记 - 宝塔部署脚本

echo "🐾 OpenClaw 饲养日记 - 宝塔部署脚本"
echo "======================================"
echo ""

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}错误：请在项目根目录运行此脚本${NC}"
    exit 1
fi

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}错误：未检测到 Node.js，请先安装${NC}"
    exit 1
fi

# 检查 pnpm
if ! command -v pnpm &> /dev/null; then
    echo -e "${YELLOW}未检测到 pnpm，正在安装...${NC}"
    npm install -g pnpm
fi

echo ""
echo "📦 安装依赖..."
pnpm install

if [ $? -ne 0 ]; then
    echo -e "${RED}依赖安装失败${NC}"
    exit 1
fi

echo ""
echo "🔨 构建项目..."
pnpm build

if [ $? -ne 0 ]; then
    echo -e "${RED}构建失败${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}✅ 构建成功！${NC}"
echo ""
echo "📁 构建输出目录：dist/"
echo ""
echo "📋 部署步骤："
echo "1. 将 dist/ 目录上传到宝塔服务器的网站根目录"
echo "   例如：/www/wwwroot/aiconversation.guide/"
echo ""
echo "2. 在宝塔面板配置网站："
echo "   - 域名：aiconversation.guide（替换为你的域名）"
echo "   - 网站根目录：/www/wwwroot/aiconversation.guide/dist"
echo "   - PHP 版本：纯静态，不需要 PHP"
echo "   - 数据库：不需要"
echo ""
echo "3. 配置 Nginx 伪静态（在宝塔面板 → 网站 → 设置 → 伪静态）："
echo ""
echo "   location / {"
echo "       try_files \$uri \$uri/ /index.html;"
echo "   }"
echo ""
echo "4. 申请 SSL 证书（宝塔面板 → 网站 → SSL → Let's Encrypt）"
echo ""
echo "🎉 部署完成！"
echo ""
