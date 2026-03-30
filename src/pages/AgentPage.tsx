import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { loadAgentArticles, FullArticle as Article } from '@/lib/agent'

// 标签配置
const TAGS = [
  { id: 'all', name: '全部' },
  { id: 'programming', name: '编程' },
  { id: 'data', name: '数据' },
  { id: 'marketing', name: '市场' },
  { id: 'writing', name: '文书' },
  { id: 'management', name: '管理' },
  { id: 'education', name: '教育' }
]

// Agent 信息映射
const AGENT_INFO: Record<string, { name: string; tags: string[] }> = {
  'frontend': { name: '前端工程师', tags: ['programming'] },
  'frontend-strict': { name: '严谨前端工程师', tags: ['programming'] },
  'backend': { name: '后端架构师', tags: ['programming'] },
  'marketing': { name: '市场分析师', tags: ['marketing'] },
  'data': { name: '数据采集专家', tags: ['data'] },
  'copywriter': { name: '文案撰写专家', tags: ['writing'] },
  'solution': { name: '方案定制专家', tags: ['management'] },
  'workflow': { name: '流程管理专家', tags: ['management'] },
  'intro': { name: 'AI Agent 介绍', tags: [] },
  'copywriter-humor': { name: '诙谐文案专家', tags: ['writing'] },
  'copywriter-cute': { name: '可爱文案专家', tags: ['writing'] },
  'copywriter-strict': { name: '严谨文案专家', tags: ['writing'] },
  'teacher': { name: '教师助手', tags: ['education'] },
  'teacher-patient': { name: '耐心型教师', tags: ['education'] },
  'professor': { name: '严格型教授', tags: ['education'] },
  'lecturer': { name: '幽默型讲师', tags: ['education'] }
}

export default function AgentPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [activeTag, setActiveTag] = useState<string>('all')

  useEffect(() => {
    loadAgentArticles().then(setArticles)
  }, [])

  // 按标签过滤文章
  const filteredArticles = articles.filter((article) => {
    if (activeTag === 'all') return true
    const agentType = article.id
    const info = AGENT_INFO[agentType]
    if (!info) return false
    return info.tags.includes(activeTag)
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题区域 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              AI Agent 教学专区
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              打造你的专属 AI 团队 — 从前端专家到后端架构师，每个 Agent 都有独特个性、专业技能和可交付成果
            </p>
          </div>

          {/* 标签 Tab */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {TAGS.map((tag) => (
                <button
                  key={tag.id}
                  onClick={() => setActiveTag(tag.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    activeTag === tag.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          {/* 统计信息 */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              共 <span className="font-semibold text-primary-500">{filteredArticles.length}</span> 个 Agent
              {activeTag !== 'all' && `（${TAGS.find(t => t.id === activeTag)?.name}）`}
            </p>
          </div>

          {/* Agent 卡片网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredArticles.map((article) => {
              const info = AGENT_INFO[article.id] || { name: article.title, tags: [] }
              
              return (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {info.name}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      阅读时间：{article.readTime}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* 使用指南 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              快速开始
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">1</div>
                <h3 className="font-semibold text-gray-900 mb-2">选择 Agent</h3>
                <p className="text-gray-600 text-sm">
                  根据需求选择合适的专业 Agent
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">激活 Agent</h3>
                <p className="text-gray-600 text-sm">
                  使用指令模板激活 Agent 身份
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">获取交付物</h3>
                <p className="text-gray-600 text-sm">
                  获得专业的工作流程和可执行代码
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-2">指令模板</h4>
              <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap">
{`你是一个 [Agent 名称]，请帮我 [具体任务]

【项目背景】
（描述你的项目）

【具体要求】
（列出具体需求）

【交付物】
（期望的输出形式）`}
              </pre>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
