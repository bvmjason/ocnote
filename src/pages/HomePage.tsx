import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { loadArticles, Article } from '@/lib/content'
import { Search } from '@/lib/Search'

type Category = 'all' | 'intro' | 'advanced' | 'cognition'

const categoryConfig: Record<Category, { label: string; range: [number, number] }> = {
  all: { label: '全部', range: [0, 16] },
  intro: { label: '入门', range: [0, 7] },
  advanced: { label: '进阶', range: [7, 14] },
  cognition: { label: '认知', range: [14, 17] }
}

export default function HomePage() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<Article[]>([])
  const [activeCategory, setActiveCategory] = useState<Category>('all')

  useEffect(() => {
    loadArticles().then(setArticles)
  }, [])

  const handleArticleSelect = (article: Article) => {
    navigate(`/article/${article.id}`)
  }

  // 按分类过滤文章
  const filteredArticles = articles.filter((article) => {
    if (activeCategory === 'all') return true
    const order = parseInt(String(article.order))
    const [start, end] = categoryConfig[activeCategory].range
    return order >= start && order < end
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8 sm:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题区域 */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              OpenClaw 饲养日记
            </h1>
            <p className="text-base sm:text-lg text-gray-600">
              记录 AI 驯养过程中的点点滴滴
            </p>
          </div>

          {/* 搜索框 */}
          <div className="mb-8">
            <Search articles={articles} onArticleSelect={handleArticleSelect} />
          </div>

          {/* 分类 Tab */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-center">
              {(Object.keys(categoryConfig) as Category[]).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                    activeCategory === category
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {categoryConfig[category].label}
                  <span className="ml-2 text-xs opacity-80">
                    {category === 'all' ? articles.length : categoryConfig[category].range[1] - categoryConfig[category].range[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 日记列表 */}
          <div id="diary" className="space-y-4">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">这个分类下还没有文章</p>
              </div>
            ) : (
              filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="block bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md hover:border-primary-300 transition-all"
                >
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-3 line-clamp-2">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
                      <span>{article.date || '2026-03-14'}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
