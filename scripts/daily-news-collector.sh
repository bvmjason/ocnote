#!/bin/bash

# OCnote 每日新闻采集脚本
# 执行时间：每天中午 12 点
# 功能：采集 OpenClaw 和 AI 相关新闻，自动更新到网站

set -e

# 配置
PROJECT_DIR="/Users/jasonkao/Desktop/workscript/html/ocnote"
CONTENT_DIR="$PROJECT_DIR/content/intro"
TODAY=$(date +%Y-%m-%d)
NEWS_FILE="$CONTENT_DIR/news-$TODAY-auto.md"

echo "📰 OCnote 每日新闻采集开始..."
echo "📅 日期：$TODAY"
echo "📁 目录：$CONTENT_DIR"

# 检查是否已存在今日新闻
if [ -f "$NEWS_FILE" ]; then
    echo "⚠️  今日新闻已存在，跳过采集"
    exit 0
fi

# 采集新闻源（需要根据实际情况调整）
echo "🔍 正在采集新闻..."

# 1. GitHub Releases (OpenClaw)
# 2. OpenClaw Discord
# 3. AI 行业新闻（36kr、虎嗅等）
# 4. 模型厂商博客（Anthropic、OpenAI、Google 等）

# 这里需要根据实际 API 或爬虫脚本填充
# 示例结构：

# 生成新闻文件
cat > "$NEWS_FILE" << 'EOF'
---
id: news-TODAY-auto
title: "📰 YYYY-MM-DD AI 新闻摘要"
description: "今日 AI 和 OpenClaw 相关新闻摘要（3-5 条）"
category: news
order: 999
readTime: "3 分钟"
date: "TODAY"
source: "AI News Daily"
sourceUrl: "https://ocnote.bvmcreative.com"
---

## 📰 新闻重点

**今日要闻：**
1. [新闻 1 标题]
2. [新闻 2 标题]
3. [新闻 3 标题]

---

## 💡 观点

**行业趋势：**
- 观察 1
- 观察 2

---

## 🎯 对 OpenClaw 用户的建议

**行动建议：**
1. 建议 1
2. 建议 2

---

**来源：** AI News Daily  
**发布日期：** TODAY
EOF

# 替换日期占位符
sed -i '' "s/TODAY/$TODAY/g" "$NEWS_FILE"
sed -i '' "s/YYYY-MM-DD/$TODAY/g" "$NEWS_FILE"

echo "✅ 新闻文件已创建：$NEWS_FILE"

# 更新 content.ts（需要手动或脚本自动添加）
echo "⚠️  请手动更新 src/lib/content.ts 添加新闻文章列表"

# 构建和部署
echo "🔨 开始构建..."
cd "$PROJECT_DIR"
pnpm build

echo "🚀 开始部署..."
cd dist
scp -P 35125 -r * root@121.43.147.73:/www/wwwroot/ocnote.bvmcreative.com/

echo "✅ 部署完成！"
echo "🔗 查看：https://ocnote.bvmcreative.com/news"

# 发送通知（通过企业微信）
# 这里需要调用企业微信 API

echo "📰 OCnote 每日新闻采集完成！"
