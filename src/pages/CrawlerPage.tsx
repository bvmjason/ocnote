import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface Article {
  id: string
  title: string
  description: string
  category: string
  order: number
  readTime: string
  content: string
}

export default function CrawlerPage() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    // TODO: 实现爬虫教学文章加载
    setArticles([])
  }, [])

  const categoryList = [
    { key: 'intro', label: '入门篇', description: '零基础入门，用 AI 写第一个爬虫', range: [0, 5] },
    { key: 'beginner', label: '初级篇', description: '静态网站批量抓取', range: [5, 10] },
    { key: 'intermediate', label: '中级篇', description: '动态网站与反爬应对', range: [10, 15] },
    { key: 'advanced', label: '高级篇', description: '逆向分析与分布式爬虫', range: [15, 20] }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-lg sm:text-xl font-bold text-gray-900 hover:text-primary-500 transition-colors truncate">
              OpenClaw
            </Link>
            
            <div className="hidden sm:flex items-center space-x-3 md:space-x-4">
              <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base">饲养日记</Link>
              <Link to="/news" className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base">新闻整理</Link>
              <Link to="/agent" className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base">AGENT 教学</Link>
              <Link to="/commands" className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base">常用指令</Link>
              <a href="https://github.com/bvmjason/ocnote" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base">社群支持</a>
            </div>

            <button className="sm:hidden p-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <main className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">🤖 用 AI 写爬虫教学</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-2">你负责拆任务，AI 负责写代码</p>
            <p className="text-sm text-gray-500">从零基础到高级逆向，20 篇完整教程</p>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">📚 学习路径</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryList.map((cat) => {
                const catArticles = articles.filter(a => {
                  const order = parseInt(String(a.order))
                  return order >= cat.range[0] && order < cat.range[1]
                })
                return (
                  <div key={cat.key} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{cat.label}</h3>
                    <p className="text-gray-600 text-sm mb-4">{cat.description}</p>
                    <div className="space-y-2">
                      {catArticles.length > 0 ? (
                        catArticles.map(article => (
                          <Link key={article.id} to={`/article/${article.id}`} className="block text-sm text-gray-700 hover:text-primary-500 transition-colors">
                            <span className="text-gray-400 mr-2">•</span>
                            {article.title}
                          </Link>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">即将发布...</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="bg-primary-50 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">💡 核心理念</h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start gap-3">
                <span className="text-primary-500 font-bold">✓</span>
                <div>
                  <strong>不需要懂编程细节</strong>
                  <p className="text-sm mt-1">你只需要会拆任务，AI 会帮你写代码</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 font-bold">✓</span>
                <div>
                  <strong>指令模板化</strong>
                  <p className="text-sm mt-1">每篇提供可直接复制的指令模板</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 font-bold">✓</span>
                <div>
                  <strong>实战驱动</strong>
                  <p className="text-sm mt-1">每篇都有完整可运行的代码示例</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-primary-500 font-bold">✓</span>
                <div>
                  <strong>法律合规</strong>
                  <p className="text-sm mt-1">只教爬公开数据，遵守法律边界</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">🛠️ 技术栈</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl mb-2">🐍</div>
                <div className="font-semibold text-gray-900">Python</div>
                <div className="text-xs text-gray-500">编程语言</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">📡</div>
                <div className="font-semibold text-gray-900">requests</div>
                <div className="text-xs text-gray-500">HTTP 请求</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🔍</div>
                <div className="font-semibold text-gray-900">BeautifulSoup</div>
                <div className="text-xs text-gray-500">HTML 解析</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🤖</div>
                <div className="font-semibold text-gray-900">OpenClaw</div>
                <div className="text-xs text-gray-500">AI 辅助</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
          <p className="mb-1">OpenClaw 饲养日记 - 记录 AI 驯养的每一天</p>
          <div className="mt-2 space-x-4">
            <a href="https://github.com/bvmjason/ocnote" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500">GitHub</a>
            <span>·</span>
            <a href="https://gitee.com/bvm_jason/ocnote" target="_blank" rel="noopener noreferrer" className="hover:text-primary-500">Gitee</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
