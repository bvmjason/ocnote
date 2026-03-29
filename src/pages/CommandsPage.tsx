import Header from '@/components/Header'
import Footer from '@/components/Footer'

const commandCategories = [
  {
    name: 'Gateway 管理',
    icon: '🚀',
    commands: [
      {
        cmd: 'openclaw gateway start',
        desc: '启动 Gateway'
      },
      {
        cmd: 'openclaw gateway restart',
        desc: '重启 Gateway'
      },
      {
        cmd: 'openclaw gateway stop',
        desc: '停止 Gateway'
      },
      {
        cmd: 'openclaw gateway status',
        desc: '查看运行状态'
      },
      {
        cmd: 'openclaw gateway logs',
        desc: '查看 Gateway 日志'
      }
    ]
  },
  {
    name: '系统管理',
    icon: '⚙️',
    commands: [
      {
        cmd: 'openclaw --version',
        desc: '查看版本号'
      },
      {
        cmd: 'openclaw update',
        desc: '更新到最新版本'
      },
      {
        cmd: 'openclaw status',
        desc: '验证安装是否成功'
      },
      {
        cmd: 'openclaw gateway repair',
        desc: '修复常见问题'
      },
      {
        cmd: 'openclaw config edit',
        desc: '编辑配置文件'
      },
      {
        cmd: 'openclaw help',
        desc: '查看所有命令'
      }
    ]
  },
  {
    name: 'Slash 命令',
    icon: '💬',
    commands: [
      {
        cmd: '/status',
        desc: '查看会话状态（模型使用/时间/成本）'
      },
      {
        cmd: '/reasoning on',
        desc: '开启推理模式'
      },
      {
        cmd: '/reasoning off',
        desc: '关闭推理模式'
      },
      {
        cmd: '/model <模型名>',
        desc: '切换模型（如：/model qwen3.5-plus）'
      },
      {
        cmd: '/memory',
        desc: '查看记忆状态'
      },
      {
        cmd: '/help',
        desc: '查看帮助'
      }
    ]
  },
  {
    name: '快速安装',
    icon: '📦',
    commands: [
      {
        cmd: 'curl -fsSL https://openclaw.ai/install.sh | bash',
        desc: '一键安装 OpenClaw'
      },
      {
        cmd: 'openclaw status',
        desc: '验证安装是否成功'
      }
    ]
  }
]

export default function CommandsPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('已复制到剪贴板！')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题区域 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🛠️ OpenClaw 常用指令手册
            </h1>
            <p className="text-lg text-gray-600">
              快速查找和复制常用命令
            </p>
          </div>

          {/* 快速安装 */}
          <div className="mb-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">📦</span>
              <h2 className="text-2xl font-bold text-gray-900">快速安装</h2>
            </div>
            
            <div className="space-y-4">
              {commandCategories.find(cat => cat.name === '快速安装')?.commands.map((cmd, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <code className="text-sm font-mono text-primary-600">{cmd.cmd}</code>
                    <button
                      onClick={() => copyToClipboard(cmd.cmd)}
                      className="text-sm text-gray-500 hover:text-primary-500"
                    >
                      📋 复制
                    </button>
                  </div>
                  <p className="text-gray-600">{cmd.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 命令分类 */}
          <div className="space-y-8">
            {commandCategories.filter(cat => cat.name !== '快速安装').map((category, catIdx) => (
              <div key={catIdx} className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl">{category.icon}</span>
                  <h2 className="text-2xl font-bold text-gray-900">{category.name}</h2>
                </div>
                
                <div className="grid gap-4 md:grid-cols-2">
                  {category.commands.map((cmd, cmdIdx) => (
                    <div key={cmdIdx} className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <code className="text-sm font-mono text-primary-600 break-all">{cmd.cmd}</code>
                        <button
                          onClick={() => copyToClipboard(cmd.cmd)}
                          className="text-sm text-gray-500 hover:text-primary-500 ml-2 flex-shrink-0"
                        >
                          📋
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm">{cmd.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 常见问题 */}
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">❓</span>
              <h2 className="text-2xl font-bold text-gray-900">常见问题</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Gateway 无法启动</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700">
                  <div>openclaw gateway stop</div>
                  <div>openclaw gateway start</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">端口被占用</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700">
                  <div>lsof -i :18800</div>
                  <div>kill -9 {'<PID>'}</div>
                  <div>openclaw gateway restart</div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">权限问题</h3>
                <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700">
                  <div>sudo chown -R $(whoami) ~/.openclaw</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
