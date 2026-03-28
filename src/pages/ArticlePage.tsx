import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { loadArticleById, loadArticles, MarkdownRenderer, Article } from '@/lib/content'
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 搜索框 */}
          <div className="mb-12">
            <Search articles={allArticles} onArticleSelect={handleArticleSelect} />
          </div>
          
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
            <MarkdownRenderer content={article.content} />
          </div>

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
      </main>

      <Footer />
    </div>
  )
}
