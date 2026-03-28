import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium">开源免费</span>
            <span className="mx-2">·</span>
            <span className="text-sm font-medium">收录 441+ 篇教程资源</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            OpenClaw 101
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 opacity-95">
            从零开始，7 天掌握你的 AI 私人助理
          </p>
          
          <p className="text-lg md:text-xl mb-10 opacity-90">
            The open-source guide to building your AI assistant with OpenClaw
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#getting-started" className="btn-primary btn-lg">
              🚀 开始学习 →
            </a>
            <a href="#resources" className="btn-secondary btn-lg !bg-white/20 !text-white !border-white hover:!bg-white/30">
              📚 浏览资源
            </a>
          </div>
          
          {/* 统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">441+</div>
              <div className="text-sm md:text-base opacity-90">教程收录</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">7 天</div>
              <div className="text-sm md:text-base opacity-90">学习路径</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">335k+</div>
              <div className="text-sm md:text-base opacity-90">OpenClaw Stars</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-sm md:text-base opacity-90">开源免费</div>
            </div>
          </div>
        </div>
      </section>

      {/* 什么是 OpenClaw */}
      <section id="what-is" className="py-16 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            什么是 OpenClaw？
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
            OpenClaw 是一个开源 AI 助理平台，让你拥有一个 24/7 在线的私人 AI 助理。
            它能理解你、帮助你、为你执行任务。
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3">全平台接入</h3>
              <p className="text-gray-600">
                Telegram、Discord、WhatsApp、Signal 等多平台无缝连接，随时随地与你的 AI 助理对话。
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-3">技能扩展</h3>
              <p className="text-gray-600">
                5400+ 社区技能，从天气查询到代码生成，一键安装即用。
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-3">数据自主</h3>
              <p className="text-gray-600">
                完全自托管，数据存储在你自己的服务器上，隐私和安全尽在掌握。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 天学习路径 */}
      <section id="getting-started" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            7 天学习路径
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            从入门到进阶，每天一个主题，循序渐进掌握 OpenClaw 的全部能力。
          </p>
          
          <div className="grid md:grid-cols-7 gap-4">
            {[
              { day: 'DAY 1', icon: '👋', title: '初识 OpenClaw', desc: '了解 AI 私人助理的真正含义' },
              { day: 'DAY 2', icon: '💬', title: '深入对话', desc: '掌握与 AI 助理对话的技巧' },
              { day: 'DAY 3', icon: '📁', title: '文件与代码', desc: '处理文件、写代码、执行脚本' },
              { day: 'DAY 4', icon: '🌐', title: '网络能力', desc: '搜索、抓取、API 调用' },
              { day: 'DAY 5', icon: '🧩', title: '技能扩展', desc: '安装社区技能' },
              { day: 'DAY 6', icon: '⏰', title: '自动化', desc: '定时任务、心跳检测' },
              { day: 'DAY 7', icon: '🚀', title: '高级技巧', desc: '多 Agent、浏览器控制' },
            ].map((item, index) => (
              <div key={index} className="card group hover:bg-primary-50 transition-colors">
                <div className="text-sm font-semibold text-primary-500 mb-2">{item.day}</div>
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 精选技能 */}
      <section id="skills" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 text-sm font-medium mb-4">
              🚀 5400+ 社区技能
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              精选技能推荐
            </h2>
            <p className="text-lg text-gray-600">
              来自 awesome-openclaw-skills 的精选技能，涵盖 31 个分类。一键安装，即刻增强你的 AI 助理能力。
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: '🌐', category: '网页 & 前端', count: '46', skills: ['frontend-design', 'nextjs-expert', 'ui-audit'] },
              { icon: '🤖', category: '编程 Agent', count: '55', skills: ['coding-agent', 'opencode-acp', 'skill-creator'] },
              { icon: '☁️', category: 'DevOps & 云', count: '144', skills: ['cloudflare', 'docker', 'kubernetes'] },
              { icon: '🔍', category: '搜索 & 研究', count: '148', skills: ['exa-plus', 'deepwiki', 'technews'] },
              { icon: '📈', category: '营销 & 销售', count: '94', skills: ['seo-audit', 'social-content', 'copywriting'] },
              { icon: '🧠', category: 'AI & 大模型', count: '159', skills: ['kimi', 'chatgpt', 'chromadb'] },
            ].map((item) => (
              <div key={item.category} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-3xl">{item.icon}</div>
                  <span className="badge badge-primary">{item.count}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <span key={skill} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🎓 实战训练营
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            AI 私人助理实战课 - 21 节视频课程，手把手带你从零部署专属 AI 助理
          </p>
          <a href="#" className="btn-primary btn-lg">
            了解详情 →
          </a>
        </div>
      </section>
    </div>
  )
}
