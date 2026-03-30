---
id: news-2026-03-27-claude-sonnet
title: "Claude 3.7 Sonnet 发布，OpenClaw 第一时间集成支持"
description: "Anthropic 发布 Claude 3.7 Sonnet，推理能力提升 30%，OpenClaw 已集成并支持模型切换"
category: news
order: 98
readTime: "4 分钟"
date: "2026-03-27"
source: "Anthropic Blog"
sourceUrl: "https://www.anthropic.com/news/claude-3-7-sonnet"
---

## 📰 新闻重点

**核心更新：**
- Anthropic 发布 Claude 3.7 Sonnet
- 推理能力提升 30%，代码能力显著提升
- 上下文窗口扩展到 200K tokens
- OpenClaw 已集成，支持一键切换

**性能对比：**
| 任务 | 3.5 Sonnet | 3.7 Sonnet | 提升 |
|------|-----------|-----------|------|
| 代码生成 | 85% | 92% | +7% |
| 数学推理 | 78% | 89% | +11% |
| 长文本理解 | 82% | 90% | +8% |

---

## 💡 观点

**值得升级的模型**

Claude 3.7 的提升主要在：
1. **复杂推理** - 多步骤任务更可靠
2. **代码能力** - 生成代码质量更高
3. **长上下文** - 200K 处理整本书

**适合场景：**
- 复杂代码项目
- 长文档分析
- 多步骤推理任务

**性价比考虑：**
- 价格与 3.5 相同
- 性能提升明显
- 推荐作为主力模型

---

## 🎯 对 OpenClaw 用户的建议

**升级步骤：**
1. 更新 OpenClaw 到最新版本
2. 运行 `openclaw configure --section models`
3. 添加 Claude 3.7 Sonnet 配置
4. 测试常用任务对比效果

**推荐配置：**
```yaml
models:
  default: claude-3-7-sonnet
  coding: claude-3-7-sonnet
  writing: claude-3-5-sonnet  # 写作继续用 3.5
```

**测试建议：**
- 用现有任务对比 3.5 和 3.7
- 重点关注代码和推理任务
- 记录性能提升明显的场景

---

**来源：** Anthropic Blog  
**发布日期：** 2026-03-27
