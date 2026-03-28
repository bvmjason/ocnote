import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { loadArticleById, loadArticles, Article } from '@/lib/content'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Search } from '@/lib/Search'

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      loadArticleById(id || ''),
      loadArticles(),
    ]).then(([loadedArticle, all]) => {
      setArticle(loadedArticle)
      setAllArticles(all)
      setLoading(false)
    })
  }, [id])

  const handleArticleSelect = (selectedArticle: Article) => {
    navigate(`/article/${selectedArticle.id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">文章未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，你访问的文章不存在</p>
          <Link to="/" className="btn-primary">返回首页</Link>
        </main>
        <Footer />
      </div>
    )
  }

  const currentIndex = allArticles.findIndex(a => a.id === article.id)
  const prevArticle = allArticles[currentIndex - 1]
  const nextArticle = allArticles[currentIndex + 1]
  
  // 获取最新文章（排除当前文章）
  const recentArticles = allArticles
    .filter(a => a.id !== article.id)
    .slice(0, 5)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 搜索框 */}
          <div className="mb-12">
            <Search articles={allArticles} onArticleSelect={handleArticleSelect} />
          </div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {/* 主内容区 */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
                {/* 文章头部 */}
                <header className="mb-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="badge badge-primary">{article.category}</span>
                    <span className="text-sm text-gray-500">⏱️ {article.readTime}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                    {article.title}
                  </h1>
                  <p className="text-xl text-gray-600">
                    {article.description}
                  </p>
                </header>

                {/* 文章内容 */}
                <MarkdownRenderer content={article.content} />

                {/* 文章导航 */}
                <nav className="flex flex-col md:flex-row gap-4 justify-between mt-12 pt-8 border-t border-gray-200">
                  {prevArticle ? (
                    <Link to={`/article/${prevArticle.id}`} className="btn-secondary text-center">
                      ← {prevArticle.title}
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  {nextArticle ? (
                    <Link to={`/article/${nextArticle.id}`} className="btn-primary text-center">
                      {nextArticle.title} →
                    </Link>
                  ) : (
                    <Link to="/" className="btn-secondary text-center">
                      返回首页 →
                    </Link>
                  )}
                </nav>
              </article>
            </div>

            {/* 右侧边栏 */}
            <div className="lg:col-span-1">
              {/* 最新文章 */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-20">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">
                  📚 最新文章
                </h3>
                <div className="space-y-3">
                  {recentArticles.map((recentArticle, index) => (
                    <Link
                      key={recentArticle.id}
                      to={`/article/${recentArticle.id}`}
                      className={`block p-3 rounded-lg transition-all ${
                        recentArticle.id === article.id
                          ? 'bg-primary-50 border-primary-200 border'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                          {index + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {recentArticle.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            ⏱️ {recentArticle.readTime}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* 快速链接 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    🚀 快速跳转
                  </h4>
                  <div className="space-y-2">
                    <Link
                      to="/"
                      className="block text-sm text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      🏠 返回首页
                    </Link>
                    <a
                      href="#intro"
                      className="block text-sm text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      📖 入门篇
                    </a>
                    <a
                      href="#skills"
                      className="block text-sm text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      🛠️ 技能库
                    </a>
                    <a
                      href="#resources"
                      className="block text-sm text-primary-500 hover:text-primary-600 transition-colors"
                    >
                      📚 资源
                    </a>
                  </div>
                </div>

                {/* 分类标签 */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">
                    📁 分类
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-primary">入门篇</span>
                    <span className="badge bg-gray-100 text-gray-600">文书</span>
                    <span className="badge bg-gray-100 text-gray-600">策划</span>
                    <span className="badge bg-gray-100 text-gray-600">撰写</span>
                    <span className="badge bg-gray-100 text-gray-600">代码</span>
                  </div>
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
