#!/bin/bash

# OpenClaw 饲养日记 - 一键部署脚本

echo "🐾 OpenClaw 饲养日记 - 部署脚本"
echo "================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

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

# 2. 推送到 GitHub
echo -e "${YELLOW}[2/4] 推送到 GitHub...${NC}"
git push origin main
echo ""

# 3. 推送到 Gitee
echo -e "${YELLOW}[3/4] 推送到 Gitee...${NC}"
git push gitee main
echo ""

# 4. 上传到服务器
echo -e "${YELLOW}[4/4] 上传到服务器...${NC}"
scp -r dist/* root@121.43.147.73:/www/server/panel/vhost/ocnote.bvmlab.com/

if [ $? -ne 0 ]; then
    echo -e "${RED}上传失败，请检查服务器连接${NC}"
    exit 1
fi
echo -e "${GREEN}✅ 上传成功${NC}"
echo ""

echo "================================"
echo -e "${GREEN}🎉 部署完成！${NC}"
echo ""
echo "访问地址："
echo "  - GitHub: https://github.com/bvmjason/ocnote"
echo "  - Gitee:  https://gitee.com/bvm_jason/ocnote"
echo "  - 官网：  http://ocnote.bvmlab.com"
echo ""
