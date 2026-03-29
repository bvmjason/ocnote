import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const newsData = [
  {
    date: '2026-03-29',
    title: 'xAI 搜索集成',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    understanding: 'OpenClaw 将 xAI 提供商迁移到 Responses API，添加原生的 x_search 功能，并自动启用 xAI 插件，让 Grok 的网络搜索无需手动配置。',
    analysis: [
      '这是重大体验优化，之前需要手动配置插件',
      'x_search 模型选择器让用户可以灵活选择搜索模型',
      '降低了 Grok 用户的使用门槛'
    ],
    suggestion: [
      '如果你用 Grok，现在可以简化配置',
      '运行 openclaw configure --section web 重新配置网络搜索',
      '测试 x_search 效果，对比之前的搜索质量'
    ]
  },
  {
    date: '2026-03-29',
    title: '插件审批系统升级 - 支持多渠道按钮',
    source: 'GitHub PR #55339',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/55339',
    understanding: '添加异步 requireApproval 钩子，让插件可以暂停工具执行，通过 exec 审批覆盖层、Telegram 按钮、Discord 交互或/approve 命令让用户审批。',
    analysis: [
      '这是安全性的重大提升',
      '之前审批只能在终端，现在可以在聊天界面直接审批',
      'Telegram 和 Discord 用户体验大幅提升'
    ],
    suggestion: [
      '启用插件审批功能，特别是涉及敏感操作的插件',
      'Telegram/Discord 用户可以直接在聊天中审批',
      '配置审批超时时间，避免长时间等待'
    ]
  },
  {
    date: '2026-03-29',
    title: 'ACP 绑定增强 - 当前对话直接绑定 Codex',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    understanding: '为 Discord、BlueBubbles 和 iMessage 添加当前对话 ACP 绑定，/acp spawn codex --bind here 可以直接把当前聊天变成 Codex 支持的工作区，无需创建子线程。',
    analysis: [
      '降低了 ACP 使用门槛',
      '之前需要创建新线程，现在可以直接在当前对话使用',
      '更清晰地区分了聊天界面、ACP 会话和运行时工作区'
    ],
    suggestion: [
      'Discord 用户试试 /acp spawn codex --bind here',
      '理解三者的区别：聊天界面 vs ACP 会话 vs 工作区',
      '在现有群聊中快速启用 Codex 协作'
    ]
  },
  {
    date: '2026-03-29',
    title: 'WhatsApp 修复 - 无限回环问题',
    source: 'GitHub PR #54570',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54570',
    understanding: '修复了自聊 DM 模式下的无限回环问题，之前机器人的回复会被重新处理为新消息，导致无限循环。',
    analysis: [
      '这是严重 bug 修复',
      '之前 WhatsApp 用户可能遇到消息轰炸',
      '现在可以安全使用自聊模式'
    ],
    suggestion: [
      'WhatsApp 用户立即更新',
      '检查是否有未读消息堆积',
      '测试自聊模式是否正常'
    ]
  },
  {
    date: '2026-03-29',
    title: 'Telegram 分割优化 - 不再截断单词',
    source: 'GitHub PR #56595',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/56595',
    understanding: '用验证过的 HTML 长度搜索替代比例估算，让长消息在单词边界分割，而不是从单词中间截断，并在开销超限时优雅降级。',
    analysis: [
      '之前长消息会被截断，阅读体验差',
      '现在分割更智能，保持语义完整',
      'Telegram 用户受益最大'
    ],
    suggestion: [
      'Telegram 用户测试长消息发送',
      '检查分割点是否合理',
      '报告任何分割异常'
    ]
  },
  {
    date: '2026-03-28',
    title: 'OpenClaw 配置架构升级',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    understanding: '删除超过两个月的自动配置迁移，旧的遗留键现在验证失败而不是在加载时被重写，Doctor 命令也不再自动修复旧配置。',
    analysis: [
      '这是配置系统的重大变更',
      '强制用户更新旧配置',
      '提高了配置的一致性和可维护性'
    ],
    suggestion: [
      '运行 openclaw doctor 检查配置',
      '备份旧配置再更新',
      '参考最新文档更新配置项'
    ]
  },
  {
    date: '2026-03-28',
    title: 'MiniMax 图像生成支持',
    source: 'GitHub PR #54487',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54487',
    understanding: '添加 MiniMax 的 image-01 模型图像生成支持，包括生成和图像到图像编辑，支持宽高比控制。',
    analysis: [
      '新增图像生成能力',
      '支持图像编辑，不只是生成',
      '宽高比控制更灵活'
    ],
    suggestion: [
      '需要图像生成的用户可以配置 MiniMax',
      '测试 image-01 模型的生成质量',
      '尝试图像编辑功能'
    ]
  },
  {
    date: '2026-03-28',
    title: 'Slack 文件上传动作',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    understanding: '添加明确的 upload-file Slack 动作，通过现有 Slack 上传传输路由文件上传，支持可选的文件名/标题/评论覆盖。',
    analysis: [
      'Slack 文件上传更可靠',
      '可以自定义文件元数据',
      '统一了文件上传接口'
    ],
    suggestion: [
      'Slack 用户测试文件上传',
      '尝试自定义文件名和标题',
      '报告任何上传问题'
    ]
  },
  {
    date: '2026-03-28',
    title: 'Microsoft Teams 文件发送支持',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    understanding: '统一文件优先发送到规范的 upload-file 动作，添加 Microsoft Teams 和 Google Chat 的明确支持，BlueBubbles 文件发送也通过 upload-file 暴露。',
    analysis: [
      '统一了文件发送接口',
      'Teams 和 Google Chat 用户现在可以发送文件',
      '保持了 legacy sendAttachment 别名'
    ],
    suggestion: [
      'Teams/Google Chat 用户测试文件发送',
      '检查文件大小限制',
      '报告任何发送问题'
    ]
  },
  {
    date: '2026-03-28',
    title: 'Matrix TTS 语音气泡',
    source: 'GitHub PR #37080',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/37080',
    understanding: '将自动 TTS 回复作为原生 Matrix 语音气泡发送，而不是通用音频附件。',
    analysis: [
      'Matrix 用户体验提升',
      '语音气泡更直观',
      '与通用音频附件区分开'
    ],
    suggestion: [
      'Matrix 用户测试 TTS 回复',
      '检查语音气泡显示是否正常',
      '对比之前的音频附件体验'
    ]
  },
  {
    date: '2026-03-27',
    title: 'OpenClaw 配置架构打印',
    source: 'GitHub PR #54523',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54523',
    understanding: '添加 openclaw config schema 命令，打印 openclaw.json 的生成 JSON 架构。',
    analysis: [
      '配置编辑更友好',
      '可以查看完整的配置项',
      '支持 IDE 自动补全'
    ],
    suggestion: [
      '运行 openclaw config schema 查看完整配置',
      '用 JSON schema 验证配置文件',
      '在 IDE 中配置 schema 获得自动补全'
    ]
  },
  {
    date: '2026-03-27',
    title: '记忆插件刷新机制',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    understanding: '将预压缩记忆刷新计划放在活跃记忆插件合约后面，让 memory-core 拥有刷新提示和目标路径策略，而不是硬编码的核心逻辑。',
    analysis: [
      '记忆系统更模块化',
      '插件可以自定义刷新行为',
      '提高了可扩展性'
    ],
    suggestion: [
      '检查记忆插件是否正常工作',
      '测试记忆压缩功能',
      '报告任何记忆丢失问题'
    ]
  },
  {
    date: '2026-03-27',
    title: 'Agent 压缩后 AGENTS 刷新',
    source: 'GitHub PR #49479',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/49479',
    understanding: '在 stale-usage 预飞行压缩后保留压缩后 AGENTS 刷新，适用于即时回复和排队后续。',
    analysis: [
      'Agent 行为更一致',
      '压缩后配置正确刷新',
      '减少了配置不同步问题'
    ],
    suggestion: [
      '测试 Agent 压缩功能',
      '检查压缩后行为是否正常',
      '报告任何配置不同步问题'
    ]
  },
  {
    date: '2026-03-27',
    title: '压缩保护原因显示',
    source: 'GitHub PR #51072',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/51072',
    understanding: '显示保护特定的取消原因，并将良性手动/compact 无操作情况重新标记为跳过而不是失败。',
    analysis: [
      '压缩状态更透明',
      '用户知道为什么压缩被取消',
      '减少了误报'
    ],
    suggestion: [
      '检查压缩日志',
      '理解各种取消原因',
      '根据原因调整配置'
    ]
  },
  {
    date: '2026-03-27',
    title: 'Tavily API 请求标记',
    source: 'GitHub PR #55335',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/55335',
    understanding: '用 X-Client-Source: openclaw 标记出站 API 请求，让 Tavily 可以归因 OpenClaw 来源的流量。',
    analysis: [
      '帮助 Tavily 了解流量来源',
      '可能获得更好的支持',
      '提高了可追溯性'
    ],
    suggestion: [
      'Tavily 用户无需额外配置',
      '检查搜索是否正常',
      '报告任何搜索问题'
    ]
  },
  {
    date: '2026-03-26',
    title: 'Anthropic 错误处理改进',
    source: 'GitHub PR #56639',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/56639',
    understanding: '将未处理的提供商停止原因（如敏感）恢复为结构化助手错误，而不是让 Agent 运行崩溃。',
    analysis: [
      '错误处理更健壮',
      'Agent 不会因为敏感内容崩溃',
      '用户体验提升'
    ],
    suggestion: [
      '测试敏感内容处理',
      '检查错误提示是否友好',
      '报告任何崩溃问题'
    ]
  },
  {
    date: '2026-03-26',
    title: 'Google 模型别名修复',
    source: 'GitHub PR #56567',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/56567',
    understanding: '通过传递实际运行时提供商 ID 并添加模板提供商回退，为所有 Google 提供商别名解析 Gemini 3.1 pro、flash 和 flash-lite，修复 flash-lite 前缀排序。',
    analysis: [
      'Google 模型选择更可靠',
      '修复了模型别名问题',
      'flash-lite 性能优化'
    ],
    suggestion: [
      'Google 用户测试模型选择',
      '尝试 flash-lite 模型',
      '报告任何模型问题'
    ]
  },
  {
    date: '2026-03-26',
    title: 'OpenAI Codex 图像工具修复',
    source: 'GitHub PR #54829',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54829',
    understanding: '为 Codex 注册图像理解功能，并通过 Codex 指令路由图像提示，让图像分析不再因缺少提供商注册或指令而失败。',
    analysis: [
      'Codex 图像分析功能修复',
      '之前可能无法分析图像',
      '现在可以正常使用'
    ],
    suggestion: [
      'Codex 用户测试图像分析',
      '上传图像让 AI 分析',
      '报告任何分析问题'
    ]
  },
  {
    date: '2026-03-26',
    title: '通用图像回退恢复',
    source: 'GitHub PR #54858',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54858',
    understanding: '当没有特定提供商的媒体理解提供商注册时，恢复通用图像运行时回退，让图像分析对 openrouter 和 minimax-portal 等提供商再次工作。',
    analysis: [
      '更多提供商支持图像分析',
      'openrouter 和 minimax 用户受益',
      '提高了兼容性'
    ],
    suggestion: [
      'openrouter/minimax 用户测试图像分析',
      '检查图像分析是否正常',
      '报告任何问题'
    ]
  },
  {
    date: '2026-03-26',
    title: 'Mistral API 修复',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    understanding: '标准化 OpenAI 兼容请求标志，让官方 Mistral API 运行不再因剩余的 422 状态码（无正文）聊天错误而失败。',
    analysis: [
      'Mistral API 兼容性提升',
      '修复了 422 错误',
      'Mistral 用户可以正常使用'
    ],
    suggestion: [
      'Mistral 用户测试 API 连接',
      '检查模型调用是否正常',
      '报告任何连接问题'
    ]
  }
]

// 新闻卡片组件（支持展开/收起）
function NewsCard({ news }: { news: typeof newsData[0] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-4">
      {/* 标题区域（始终显示） */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-2 pr-8">
          {news.title}
        </h3>
        
        {/* 来源 */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>📍</span>
          <a 
            href={news.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600 hover:underline truncate"
          >
            {news.source}
          </a>
          <span className="text-gray-400 ml-auto flex-shrink-0">
            {isExpanded ? '🔼' : '🔽'}
          </span>
        </div>
      </div>

      {/* 详细内容（展开后显示） */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          {/* 理解 */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">🧠</span>
              <span className="font-semibold text-gray-900">理解</span>
            </div>
            <p className="text-gray-700 bg-blue-50 p-3 rounded-lg text-sm leading-relaxed">
              {news.understanding}
            </p>
          </div>

          {/* 分析 */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">📊</span>
              <span className="font-semibold text-gray-900">分析</span>
            </div>
            <ul className="space-y-2">
              {news.analysis.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-primary-500 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 建议 */}
          <div className="mt-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">💡</span>
              <span className="font-semibold text-gray-900">建议</span>
            </div>
            <ul className="space-y-2">
              {news.suggestion.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

// 分类索引组件
function CategoryIndex() {
  const categories = {
    '🔧 功能更新': [
      'xAI 搜索集成',
      '插件审批系统升级',
      'ACP 绑定增强',
      'MiniMax 图像生成',
      'Slack 文件上传',
      'Teams 文件发送',
      'Matrix TTS 语音气泡'
    ],
    '🐛 Bug 修复': [
      'WhatsApp 无限回环',
      'Telegram 分割优化',
      'Anthropic 错误处理',
      'Google 模型别名',
      'Codex 图像工具',
      '通用图像回退',
      'Mistral API'
    ],
    '⚙️ 配置优化': [
      '配置架构升级',
      '配置架构打印',
      '记忆插件刷新',
      'Agent 压缩刷新',
      '压缩保护显示'
    ],
    '📊 其他': [
      'Tavily API 标记'
    ]
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📋 新闻分类索引</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(categories).map(([category, items]) => (
          <div key={category}>
            <h4 className="font-semibold text-gray-900 mb-2 text-sm">{category}</h4>
            <ul className="space-y-1">
              {items.map((item, i) => (
                <li key={i} className="text-sm text-gray-700">
                  <span className="text-gray-400 mr-2">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

// 订阅组件
function SubscribeSection() {
  return (
    <div className="bg-primary-50 rounded-xl p-4 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">📬 订阅新闻</h3>
      <p className="text-gray-700 mb-3 text-sm">想第一时间获取 OpenClaw 新闻？</p>
      <ul className="space-y-2 text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-primary-500 mt-1 flex-shrink-0">•</span>
          <a 
            href="https://github.com/openclaw/openclaw/releases" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary-500 hover:underline text-sm"
          >
            GitHub Releases - 订阅 Release 通知
          </a>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary-500 mt-1 flex-shrink-0">•</span>
          <a 
            href="https://discord.gg/clawd" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary-500 hover:underline text-sm"
          >
            Discord - 加入官方 Discord
          </a>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-primary-500 mt-1 flex-shrink-0">•</span>
          <a 
            href="https://docs.openclaw.ai" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary-500 hover:underline text-sm"
          >
            文档 - docs.openclaw.ai
          </a>
        </li>
      </ul>
    </div>
  )
}

export default function NewsPage() {
  // 按日期分组
  const groupedNews = newsData.reduce((acc, news) => {
    if (!acc[news.date]) {
      acc[news.date] = []
    }
    acc[news.date].push(news)
    return acc
  }, {} as Record<string, typeof newsData>)

  const dates = Object.keys(groupedNews).sort().reverse()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              📰 OpenClaw 新闻中心
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-2">
              过去两周的 OpenClaw 相关新闻
            </p>
            <p className="text-sm text-gray-500">
              每条都附带理解、分析、建议
            </p>
            <p className="text-xs text-gray-400 mt-3">
              更新时间：2026-03-29 18:00
            </p>
          </div>

          {/* 日期分组新闻列表 */}
          <div className="space-y-8">
            {dates.map((date) => (
              <div key={date}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">
                  {date}
                </h2>
                <div className="space-y-4">
                  {groupedNews[date].map((news, index) => (
                    <NewsCard key={index} news={news} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 分类索引 */}
          <div className="mt-12">
            <CategoryIndex />
          </div>

          {/* 订阅 */}
          <SubscribeSection />

          {/* 统计信息 */}
          <div className="text-center text-xs sm:text-sm text-gray-500 mt-8 pb-8">
            <p className="mb-1">最后更新：2026-03-29 18:00</p>
            <p className="mb-1">新闻数量：20 条</p>
            <p>时间跨度：2026-03-16 ~ 2026-03-29</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
