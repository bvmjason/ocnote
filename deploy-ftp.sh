#!/bin/bash

# OpenClaw 饲养日记 - FTP 自动部署脚本（tar.gz 版本）

echo "🐾 OpenClaw 饲养日记 - FTP 部署脚本"
echo "===================================="
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
FTP_PATH="/"

cd ~/Desktop/workscript/html/ocnote

# 1. 构建
echo -e "${YELLOW}[1/4] 构建项目...${NC}"
pnpm build

if [ $? -ne 0 ]; then
    echo -e "${RED}构建失败${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 构建成功${NC}"
echo ""

# 2. 创建 tar.gz 压缩包
echo -e "${YELLOW}[2/4] 创建 tar.gz 压缩包...${NC}"
TEMP_TAR="/tmp/ocnote-dist-$(date +%Y%m%d-%H%M%S).tar.gz"
cd dist
tar -czvf "$TEMP_TAR" .
cd ..
echo -e "${GREEN}✅ 打包完成${NC}"
echo ""

# 3. FTP 上传
echo -e "${YELLOW}[3/4] 上传到服务器...${NC}"

# 使用 curl 上传
curl -T "$TEMP_TAR" "ftp://$FTP_HOST:$FTP_PORT$FTP_PATH" --user "$FTP_USER:$FTP_PASS"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ 上传成功${NC}"
else
    echo -e "${RED}❌ 上传失败${NC}"
    rm -f "$TEMP_TAR"
    exit 1
fi
echo ""

# 4. 推送到 Git
echo -e "${YELLOW}[4/4] 推送到 GitHub 和 Gitee...${NC}"
git add .
git commit -m "chore: 自动部署 $(date +%Y-%m-%d %H:%M)"
git push origin main
git push gitee main
echo -e "${GREEN}✅ Git 推送成功${NC}"
echo ""

# 清理临时文件
rm -f "$TEMP_TAR"

echo "================================"
echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo "访问地址：http://ocnote.bvmcreative.com"
