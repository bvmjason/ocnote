#!/bin/bash

# 测试内容变更检测功能

echo "🧪 测试内容变更检测功能"
echo "========================"
echo ""

WORK_DIR="$HOME/Desktop/workscript/html/ocnote"
CONTENT_DIR="$WORK_DIR/content/intro"
CHECKSUM_FILE="$WORK_DIR/.content_checksum"

cd "$WORK_DIR"

# 1. 计算当前 checksum
echo "1. 计算当前内容 checksum..."
if command -v md5sum &> /dev/null; then
    # Linux
    current_checksum=$(find "$CONTENT_DIR" -name "*.md" -type f -exec md5 {} \; 2>/dev/null | sort | md5sum | awk '{print $1}')
elif command -v openssl &> /dev/null; then
    # macOS with openssl
    current_checksum=$(find "$CONTENT_DIR" -name "*.md" -type f -exec openssl md5 {} \; 2>/dev/null | sort | openssl md5 | awk '{print $2}')
elif command -v shasum &> /dev/null; then
    # macOS fallback
    current_checksum=$(find "$CONTENT_DIR" -name "*.md" -type f -exec shasum -a 256 {} \; 2>/dev/null | sort | shasum -a 256 | awk '{print $1}')
else
    current_checksum=""
fi
echo "   当前 checksum: $current_checksum"

# 2. 检查是否有历史记录
if [ -f "$CHECKSUM_FILE" ]; then
    last_checksum=$(cat "$CHECKSUM_FILE")
    echo "   上次 checksum: $last_checksum"
    echo ""
    
    if [ "$current_checksum" = "$last_checksum" ]; then
        echo "✅ 内容未变更"
    else
        echo "🔄 内容已变更"
    fi
else
    echo "   ⚠️  无历史记录（首次运行）"
    echo ""
    echo "ℹ️  创建 checksum 文件..."
    echo "$current_checksum" > "$CHECKSUM_FILE"
    echo "✅ 已创建：$CHECKSUM_FILE"
fi

echo ""
echo "3. 内容文件列表:"
find "$CONTENT_DIR" -name "*.md" -type f -exec basename {} \;

echo ""
echo "========================"
echo "测试完成"
