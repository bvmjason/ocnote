#!/bin/bash

# OCnote 内容检查脚本
# 每次更新后运行，记录内容状态

echo "================================"
echo "OCnote 内容检查报告"
echo "================================"
echo "检查时间：$(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 统计各分类文章数量
echo "📊 分类统计："
echo "--------------------------------"
echo "饲养日记 (intro/advanced/cognition):"
intro=$(grep -h "^category: intro" content/intro/*.md 2>/dev/null | wc -l)
advanced=$(grep -h "^category: advanced" content/intro/*.md 2>/dev/null | wc -l)
cognition=$(grep -h "^category: cognition" content/intro/*.md 2>/dev/null | wc -l)
diary_total=$((intro + advanced + cognition))
echo "  - intro: $intro"
echo "  - advanced: $advanced"
echo "  - cognition: $cognition"
echo "  - 总计：$diary_total"
echo ""

echo "新闻整理 (news):"
news=$(grep -h "^category: news" content/intro/*.md 2>/dev/null | wc -l)
echo "  - 总计：$news"
echo ""

echo "AGENT 教学 (agent):"
agent=$(grep -h "^category: agent" content/intro/*.md 2>/dev/null | wc -l)
echo "  - 总计：$agent"
echo ""

echo "爬虫教学 (crawler):"
crawler=$(grep -h "^category: crawler" content/intro/*.md 2>/dev/null | wc -l)
echo "  - 总计：$crawler"
echo ""

echo "================================"
echo "总计：$((diary_total + news + agent + crawler)) 篇"
echo "================================"
echo ""

# 检查 content.ts 中的 ARTICLE_LIST
echo "📝 content.ts 检查："
echo "--------------------------------"
ts_count=$(grep -c "id: '" src/lib/content.ts)
echo "ARTICLE_LIST 条目数：$ts_count"
echo ""

# 对比
echo "🔍 对比检查："
echo "--------------------------------"
md_total=$((diary_total + news + agent + crawler))
if [ "$ts_count" -eq "$md_total" ]; then
    echo "✅ content.ts 条目数 ($ts_count) 与 markdown 文件数 ($md_total) 一致"
else
    echo "❌ content.ts 条目数 ($ts_count) 与 markdown 文件数 ($md_total) 不一致！"
    echo "   差值：$((ts_count - md_total))"
fi
echo ""

# 记录到日志
log_file="content-check-$(date +%Y%m%d).log"
{
    echo "检查时间：$(date '+%Y-%m-%d %H:%M:%S')"
    echo "饲养日记：$diary_total (intro:$intro, advanced:$advanced, cognition:$cognition)"
    echo "新闻整理：$news"
    echo "AGENT 教学：$agent"
    echo "爬虫教学：$crawler"
    echo "content.ts 条目：$ts_count"
    echo "总计：$md_total"
    echo "---"
} >> "$log_file"

echo "📄 日志已记录：$log_file"
echo ""
