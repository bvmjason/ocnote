#!/bin/bash

# OpenClaw 饲养日记 - 快速启动脚本

echo "🐾 OpenClaw 饲养日记 - 启动中..."
echo ""

# 检查是否安装了 pnpm
if ! command -v pnpm &> /dev/null; then
    echo "❌ 未检测到 pnpm，请先安装："
    echo "   npm install -g pnpm"
    exit 1
fi

# 检查是否安装了 node_modules
if [ ! -d "node_modules" ]; then
    echo "📦 首次运行，安装依赖中..."
    pnpm install
fi

echo ""
echo "🚀 启动开发服务器..."
echo "   访问地址：http://localhost:5173"
echo ""

pnpm dev
