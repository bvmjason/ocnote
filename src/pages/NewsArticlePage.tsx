import { useParams, Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const newsData = [
  {
    id: 'xai-search-integration',
    date: '2026-03-29',
    title: 'xAI 搜索集成',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    summary: 'OpenClaw 将 xAI 提供商迁移到 Responses API，添加原生的 x_search 功能，并自动启用 xAI 插件。',
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
    id: 'plugin-approval-upgrade',
    date: '2026-03-29',
    title: '插件审批系统升级 - 支持多渠道按钮',
    source: 'GitHub PR #55339',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/55339',
    summary: '添加异步 requireApproval 钩子，让插件可以暂停工具执行，通过多渠道让用户审批。',
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
    id: 'acp-binding-enhancement',
    date: '2026-03-29',
    title: 'ACP 绑定增强 - 当前对话直接绑定 Codex',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    summary: '为 Discord、BlueBubbles 和 iMessage 添加当前对话 ACP 绑定，无需创建子线程。',
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
    id: 'whatsapp-loop-fix',
    date: '2026-03-29',
    title: 'WhatsApp 修复 - 无限回环问题',
    source: 'GitHub PR #54570',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54570',
    summary: '修复了自聊 DM 模式下的无限回环问题，之前机器人的回复会被重新处理为新消息。',
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
    id: 'telegram-split-optimization',
    date: '2026-03-29',
    title: 'Telegram 分割优化 - 不再截断单词',
    source: 'GitHub PR #56595',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/56595',
    summary: '用验证过的 HTML 长度搜索替代比例估算，让长消息在单词边界分割。',
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
    id: 'config-architecture-upgrade',
    date: '2026-03-28',
    title: 'OpenClaw 配置架构升级',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    summary: '删除超过两个月的自动配置迁移，旧的遗留键现在验证失败而不是在加载时被重写。',
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
    id: 'minimax-image-generation',
    date: '2026-03-28',
    title: 'MiniMax 图像生成支持',
    source: 'GitHub PR #54487',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54487',
    summary: '添加 MiniMax 的 image-01 模型图像生成支持，包括生成和图像到图像编辑。',
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
    id: 'slack-file-upload',
    date: '2026-03-28',
    title: 'Slack 文件上传动作',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    summary: '添加明确的 upload-file Slack 动作，通过现有 Slack 上传传输路由文件上传。',
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
    id: 'teams-file-support',
    date: '2026-03-28',
    title: 'Microsoft Teams 文件发送支持',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    summary: '统一文件优先发送到规范的 upload-file 动作，添加 Microsoft Teams 和 Google Chat 的明确支持。',
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
    id: 'matrix-tts-voice',
    date: '2026-03-28',
    title: 'Matrix TTS 语音气泡',
    source: 'GitHub PR #37080',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/37080',
    summary: '将自动 TTS 回复作为原生 Matrix 语音气泡发送，而不是通用音频附件。',
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
    id: 'config-schema-print',
    date: '2026-03-27',
    title: 'OpenClaw 配置架构打印',
    source: 'GitHub PR #54523',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54523',
    summary: '添加 openclaw config schema 命令，打印 openclaw.json 的生成 JSON 架构。',
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
    id: 'memory-plugin-refresh',
    date: '2026-03-27',
    title: '记忆插件刷新机制',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    summary: '将预压缩记忆刷新计划放在活跃记忆插件合约后面，让 memory-core 拥有刷新提示和目标路径策略。',
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
    id: 'agent-compaction-refresh',
    date: '2026-03-27',
    title: 'Agent 压缩后 AGENTS 刷新',
    source: 'GitHub PR #49479',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/49479',
    summary: '在 stale-usage 预飞行压缩后保留压缩后 AGENTS 刷新，适用于即时回复和排队后续。',
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
    id: 'compaction-reason-display',
    date: '2026-03-27',
    title: '压缩保护原因显示',
    source: 'GitHub PR #51072',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/51072',
    summary: '显示保护特定的取消原因，并将良性手动/compact 无操作情况重新标记为跳过而不是失败。',
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
    id: 'tavily-api-marker',
    date: '2026-03-27',
    title: 'Tavily API 请求标记',
    source: 'GitHub PR #55335',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/55335',
    summary: '用 X-Client-Source: openclaw 标记出站 API 请求，让 Tavily 可以归因 OpenClaw 来源的流量。',
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
    id: 'anthropic-error-handling',
    date: '2026-03-26',
    title: 'Anthropic 错误处理改进',
    source: 'GitHub PR #56639',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/56639',
    summary: '将未处理的提供商停止原因（如敏感）恢复为结构化助手错误，而不是让 Agent 运行崩溃。',
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
    id: 'google-model-alias-fix',
    date: '2026-03-26',
    title: 'Google 模型别名修复',
    source: 'GitHub PR #56567',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/56567',
    summary: '通过传递实际运行时提供商 ID 并添加模板提供商回退，为所有 Google 提供商别名解析 Gemini 3.1 pro、flash 和 flash-lite。',
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
    id: 'codex-image-tool-fix',
    date: '2026-03-26',
    title: 'OpenAI Codex 图像工具修复',
    source: 'GitHub PR #54829',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54829',
    summary: '为 Codex 注册图像理解功能，并通过 Codex 指令路由图像提示，让图像分析不再因缺少提供商注册或指令而失败。',
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
    id: 'image-fallback-restoration',
    date: '2026-03-26',
    title: '通用图像回退恢复',
    source: 'GitHub PR #54858',
    sourceUrl: 'https://github.com/openclaw/openclaw/pull/54858',
    summary: '当没有特定提供商的媒体理解提供商注册时，恢复通用图像运行时回退，让图像分析对 openrouter 和 minimax-portal 等提供商再次工作。',
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
    id: 'mistral-api-fix',
    date: '2026-03-26',
    title: 'Mistral API 修复',
    source: 'GitHub Releases',
    sourceUrl: 'https://github.com/openclaw/openclaw/releases',
    summary: '标准化 OpenAI 兼容请求标志，让官方 Mistral API 运行不再因剩余的 422 状态码（无正文）聊天错误而失败。',
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

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>()
  const news = newsData.find(n => n.id === id)

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">😕 新闻未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，这条新闻不存在或已被删除</p>
          <Link to="/news" className="text-primary-500 hover:text-primary-600 font-medium">
            返回新闻列表 →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 返回按钮 */}
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-500 transition-colors mb-6"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            返回新闻列表
          </Link>

          {/* 文章头部 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full font-medium">
                {news.date}
              </span>
              <span>📍</span>
              <a 
                href={news.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 hover:text-primary-600 hover:underline"
              >
                {news.source}
              </a>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              {news.title}
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed">
              {news.summary}
            </p>
          </div>

          {/* 文章内容 */}
          <div className="space-y-6">
            {/* 理解 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900">理解</h2>
              </div>
              <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg">
                {news.understanding}
              </p>
            </div>

            {/* 分析 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900">分析</h2>
              </div>
              <ul className="space-y-3">
                {news.analysis.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-primary-500 mt-1 flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 建议 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xl font-bold text-gray-900">建议</h2>
              </div>
              <ul className="space-y-3">
                {news.suggestion.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-green-500 mt-1 flex-shrink-0">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 下一篇导航 */}
          <div className="mt-8 flex justify-between items-center">
            <Link 
              to="/news" 
              className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
            >
              ← 返回新闻列表
            </Link>
            <span className="text-sm text-gray-500">
              {newsData.findIndex(n => n.id === id) + 1} / {newsData.length}
            </span>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
