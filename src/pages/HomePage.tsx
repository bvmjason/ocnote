import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { loadArticles, Article } from '@/lib/content'
import { Search } from '@/lib/Search'

export default function HomePage() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    loadArticles().then(setArticles)
  }, [])

  const handleArticleSelect = (article: Article) => {
    navigate(`/article/${article.id}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 标题区域 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🐾 OpenClaw 饲养日记
            </h1>
            <p className="text-lg text-gray-600">
              记录 AI 驯养过程中的点点滴滴
            </p>
          </div>

          {/* 搜索框 */}
          <div className="mb-12">
            <Search articles={articles} onArticleSelect={handleArticleSelect} />
          </div>

          {/* 日记列表 */}
          <div id="diary" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              📖 日记列表
            </h2>
            
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="block bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-primary-300 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>📅 {article.date || '2026-03-14'}</span>
                      <span>⏱️ {article.readTime}</span>
                    </div>
                  </div>
                  <span className="text-primary-500 font-medium">
                    阅读 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
