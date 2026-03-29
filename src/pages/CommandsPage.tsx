import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState } from 'react'

const commands = [
  {
    category: 'Gateway 管理',
    icon: '🚀',
    items: [
      { cmd: 'openclaw gateway start', desc: '启动 Gateway' },
      { cmd: 'openclaw gateway restart', desc: '重启 Gateway' },
      { cmd: 'openclaw gateway stop', desc: '停止 Gateway' },
      { cmd: 'openclaw gateway status', desc: '查看运行状态' },
      { cmd: 'openclaw gateway logs', desc: '查看 Gateway 日志' }
    ]
  },
  {
    category: '系统管理',
    icon: '⚙️',
    items: [
      { cmd: 'openclaw --version', desc: '查看版本号' },
      { cmd: 'openclaw update', desc: '更新到最新版本' },
      { cmd: 'openclaw status', desc: '验证安装是否成功' },
      { cmd: 'openclaw gateway repair', desc: '修复常见问题' },
      { cmd: 'openclaw config edit', desc: '编辑配置文件' },
      { cmd: 'openclaw help', desc: '查看所有命令' }
    ]
  },
  {
    category: 'Slash 命令',
    icon: '💬',
    items: [
      { cmd: '/status', desc: '查看会话状态（模型使用/时间/成本）' },
      { cmd: '/reasoning on', desc: '开启推理模式' },
      { cmd: '/reasoning off', desc: '关闭推理模式' },
      { cmd: '/model <模型名>', desc: '切换模型（如：/model qwen3.5-plus）' },
      { cmd: '/memory', desc: '查看记忆状态' },
      { cmd: '/help', desc: '查看帮助' }
    ]
  },
  {
    category: '国内平台接入',
    icon: '🇨🇳',
    items: [
      { cmd: 'openclaw channels add feishu', desc: '添加飞书通道' },
      { cmd: 'openclaw channels add dingtalk', desc: '添加钉钉通道' },
      { cmd: 'openclaw channels add wechat', desc: '添加微信通道' },
      { cmd: 'openclaw channels add wecom', desc: '添加企业微信通道' },
      { cmd: 'openclaw config set channels.wecom.botId <BOT_ID>', desc: '配置企业微信 Bot ID' },
      { cmd: 'openclaw config set channels.wecom.secret <SECRET>', desc: '配置企业微信 Secret' }
    ]
  },
  {
    category: '快速安装',
    icon: '📦',
    items: [
      { cmd: 'curl -fsSL https://openclaw.ai/install.sh | bash', desc: '一键安装 OpenClaw' },
      { cmd: 'openclaw status', desc: '验证安装是否成功' }
    ]
  }
]

export default function CommandsPage() {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  const copyToClipboard = async (text: string, index: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">🛠️ OpenClaw 常用指令</h1>
            <p className="text-base sm:text-lg text-gray-600">快速查找和复制常用命令</p>
          </div>

          <div className="space-y-8">
            {commands.map((category, catIdx) => (
              <div key={catIdx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-xl font-bold text-gray-900">{category.category}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.items.map((item, itemIdx) => {
                    const index = `${catIdx}-${itemIdx}`
                    return (
                      <div key={itemIdx} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2 gap-2">
                          <code className="text-sm font-mono text-primary-600 break-all flex-1">{item.cmd}</code>
                          <button
                            onClick={() => copyToClipboard(item.cmd, index)}
                            className={`text-xs px-3 py-1 rounded transition-colors flex-shrink-0 ${
                              copiedIndex === index
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {copiedIndex === index ? '✓ 已复制' : '📋 复制'}
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-primary-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💡 使用提示</h3>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">•</span>
                <span>点击"复制"按钮即可复制命令到剪贴板</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">•</span>
                <span>国内平台接入需要先安装对应的插件</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary-500 mt-1">•</span>
                <span>企业微信长链接模式需要配置 Bot ID 和 Secret</span>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
