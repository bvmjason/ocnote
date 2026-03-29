import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { loadArticleById, loadArticles, Article } from '@/lib/content'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'

// 移除标题中的表情符号
function cleanTitle(title: string): string {
  return title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s\u3040-\u309F\u30A0-\u30FF\-_.,!?()"'《》""''【】、]/g, '').trim()
}

export default function NewsArticlePage() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      loadArticleById(id || ''),
      loadArticles(),
    ]).then(([loadedArticle]) => {
      setArticle(loadedArticle)
      setLoading(false)
    })
  }, [id])

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
          <h1 className="text-4xl font-bold mb-4">新闻未找到</h1>
          <p className="text-gray-600 mb-8">抱歉，你访问的新闻不存在</p>
          <Link to="/news" className="btn-primary">返回新闻列表</Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 返回链接 */}
          <Link to="/news" className="inline-flex items-center text-sm text-primary-500 hover:text-primary-600 mb-8">
            ← 返回新闻列表
          </Link>

          <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            {/* 新闻头部 */}
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                <span className="badge badge-primary">{article.category}</span>
                <span>{article.source || '未知来源'}</span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span>{article.readTime}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {cleanTitle(article.title)}
              </h1>
              <p className="text-base text-gray-600">
                {article.description}
              </p>
            </header>

            {/* 新闻内容 */}
            <div className="prose prose-sm max-w-none">
              <MarkdownRenderer content={article.content} />
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  )
}
