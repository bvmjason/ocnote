import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { loadNewsArticles, FullArticle as Article } from '@/lib/news'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// 移除标题中的表情符号
function cleanTitle(title: string): string {
  return title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s\u3040-\u309F\u30A0-\u30FF\-_.,!?()"'《》""''【】、]/g, '').trim()
}

// 截取 30 字摘要
function truncateSummary(text: string, length: number = 30): string {
  const clean = text.replace(/[#*_~`>\[\]]/g, '').trim()
  return clean.length <= length ? clean : clean.substring(0, length) + '...'
}

export default function NewsPage() {
  const [newsArticles, setNewsArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadNewsArticles().then((news) => {
      setNewsArticles(news)
      setLoading(false)
    })
  }, [])

  // 按日期分组
  const groupedNews = newsArticles.reduce((acc, article) => {
    const date = article.date || '2026-03-29'
    if (!acc[date]) acc[date] = []
    acc[date].push(article)
    return acc
  }, {} as Record<string, Article[]>)

  const dates = Object.keys(groupedNews).sort().reverse()

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">OpenClaw 新闻中心</h1>
            <p className="text-base sm:text-lg text-gray-600 mb-2">过去两周的 OpenClaw 相关新闻</p>
            <p className="text-sm text-gray-500">每条都附带理解、分析、建议</p>
            <p className="text-xs text-gray-400 mt-3">更新时间：2026-03-29 18:00</p>
          </div>

          {newsArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">暂无新闻</p>
            </div>
          ) : (
            <div className="space-y-8">
              {dates.map((date) => (
                <div key={date}>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-primary-500">{date}</h2>
                  <div className="space-y-4">
                    {groupedNews[date].map((article) => (
                      <Link
                        key={article.id}
                        to={`/news/${article.id}`}
                        className="block bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md hover:border-primary-300 transition-all"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {cleanTitle(article.title)}
                        </h3>
                        <p className="text-gray-600 text-sm mb-3">
                          {truncateSummary(article.description, 30)}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{article.source || '未知来源'}</span>
                          <span>·</span>
                          <span>{article.date}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center text-xs sm:text-sm text-gray-500 mt-8 pb-8">
            <p className="mb-1">最后更新：2026-03-29 18:00</p>
            <p className="mb-1">新闻数量：{newsArticles.length} 条</p>
            <p>时间跨度：2026-03-16 ~ 2026-03-29</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
