#!/bin/bash

# OCnote 自动化内容同步脚本
# 功能：自动检查 markdown 文件并更新 content.ts 的 ARTICLE_LIST

echo "================================"
echo "OCnote 内容自动同步"
echo "================================"
echo "检查时间：$(date '+%Y-%m-%d %H:%M:%S')"
echo ""

CONTENT_TS="src/lib/content.ts"
CONTENT_DIR="content/intro"

# 获取所有 markdown 文件的 ID 列表
md_ids=$(grep -h "^id:" $CONTENT_DIR/*.md | sed 's/id: //;s/"//g' | sort)

# 获取 content.ts 中已有的 ID 列表
ts_ids=$(grep "id: '" $CONTENT_TS | sed "s/id: '//;s/',$//" | sort)

# 找出缺失的 ID
missing_ids=$(comm -23 <(echo "$md_ids") <(echo "$ts_ids"))

if [ -z "$missing_ids" ]; then
    echo "✅ content.ts 已包含所有文章"
else
    echo "⚠️  发现新文章，需要更新 content.ts："
    echo "$missing_ids"
    echo ""
    
    # 为每个缺失的文章添加条目
    for id in $missing_ids; do
        file=$(grep -l "^id: $id$" $CONTENT_DIR/*.md)
        category=$(grep "^category:" "$file" | sed 's/category: //')
        order=$(grep "^order:" "$file" | sed 's/order: //')
        
        # 根据 category 和 order 确定 path 前缀
        if [[ "$id" == agent-* ]]; then
            prefix="agent"
        elif [[ "$id" == news-* ]]; then
            prefix="news"
        else
            prefix=$(printf "%02d" $order)
        fi
        
        echo "  添加：$id (category: $category, order: $order)"
        
        # 找到插入位置（在最后一个条目之后）
        if [[ "$id" == agent-* ]]; then
            # Agent 文章插入到 agent 区域
            sed -i '' "/id: 'agent-workflow'/a\\
  },\\
  {\\
    id: '$id',\\
    path: '/assets/${id}-LS0tCmlk.md',\\
    order: $order" $CONTENT_TS
        elif [[ "$id" == news-* ]]; then
            # 新闻文章插入到 news 区域
            last_news=$(grep "id: 'news-" $CONTENT_TS | tail -1 | sed "s/.*id: '//;s/'.*//")
            sed -i '' "/id: '$last_news'/a\\
  },\\
  {\\
    id: '$id',\\
    path: '/assets/${id}-LS0tCmlk.md',\\
    order: $order" $CONTENT_TS
        else
            # 饲养日记插入到对应位置
            prev_id=$(grep -B10 "id: 'agent-intro'" $CONTENT_TS | grep "id: '" | tail -1 | sed "s/.*id: '//;s/'.*//")
            sed -i '' "/id: '$prev_id'/a\\
  },\\
  {\\
    id: '$id',\\
    path: '/assets/${prefix}-${id}-LS0tCmlk.md',\\
    order: $order" $CONTENT_TS
        fi
    done
    
    echo ""
    echo "✅ content.ts 已更新"
fi

echo ""
echo "================================"
