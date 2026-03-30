import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ReadingProgress from '@/components/ReadingProgress'
import { loadArticleById, loadAllArticles, FullArticle as Article } from '@/lib/articles'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Search } from '@/lib/Search'

interface SearchArticle {
  id: string
  title: string
  description: string
  content: string
}

// 移除标题中的表情符号
function cleanTitle(title: string): string {
  return title.replace(/[^\u4e00-\u9fa5a-zA-Z0-9\s\u3040-\u309F\u30A0-\u30FF\-_.,!?()"'《》""''【】、]/g, '').trim()
}

// 动态注入 JSON-LD 结构化数据
function injectArticleSchema(article: Article) {
  const cleanTitleStr = cleanTitle(article.title)
  
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": cleanTitleStr,
    "description": article.description,
    "datePublished": article.date || '2026-03-14',
    "dateModified": article.date || '2026-03-14',
    "author": {
      "@type": "Person",
      "name": "Jason Kao",
      "url": "https://github.com/bvmjason"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BVM Creative",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ocnote.bvmcreative.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ocnote.bvmcreative.com/article/${article.id}`
    }
  }
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "首页",
        "item": "https://ocnote.bvmcreative.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": article.category === 'crawler' ? '爬虫教学' : 
                  article.category === 'agent' ? 'AGENT 教学' : 
                  article.category === 'news' ? '新闻整理' : '饲养日记',
        "item": article.category === 'crawler' ? 'https://ocnote.bvmcreative.com/crawler' :
                  article.category === 'agent' ? 'https://ocnote.bvmcreative.com/agent' :
                  article.category === 'news' ? 'https://ocnote.bvmcreative.com/news' : 'https://ocnote.bvmcreative.com/'
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanTitleStr,
        "item": `https://ocnote.bvmcreative.com/article/${article.id}`
      }
    ]
  }
  
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.textContent = JSON.stringify([articleSchema, breadcrumbSchema])
  document.head.appendChild(script)
  return script
}

export default function ArticlePage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [article, setArticle] = useState<Article | null>(null)
  const [allArticles, setAllArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let schemaScript: HTMLScriptElement | null = null
    
    Promise.all([
      loadArticleById(id || ''),
      loadAllArticles(),
    ]).then(([loadedArticle, all]) => {
      setArticle(loadedArticle)
      setAllArticles(all)
      setLoading(false)
      
      if (loadedArticle) {
        schemaScript = injectArticleSchema(loadedArticle)
      }
    })

    return () => {
      if (schemaScript && document.head.contains(schemaScript)) {
        document.head.removeChild(schemaScript)
      }
    }
  }, [id])

  const handleArticleSelect = (article: SearchArticle) => {
    navigate(`/article/${article.id}`)
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

  // 获取同分类的文章用于推荐
  const relatedArticles = allArticles
    .filter(a => a.category === article.category && a.id !== article.id)
    .slice(0, 5)

  // 获取上一篇和下一篇（同分类内）
  const categoryArticles = allArticles.filter(a => a.category === article.category)
  const currentIndex = categoryArticles.findIndex(a => a.id === article.id)
  const prevArticle = categoryArticles[currentIndex - 1]
  const nextArticle = categoryArticles[currentIndex + 1]

  return (
    <div className="min-h-screen bg-gray-50">
      <ReadingProgress />
      <Header />
      
      <main className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 搜索栏 */}
          <div className="mb-12">
            <Search articles={allArticles} onArticleSelect={handleArticleSelect} />
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* 文章内容 */}
            <div className="lg:col-span-3">
              <article className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
                <header className="mb-12">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="badge badge-primary">{article.category === 'crawler' ? '爬虫教学' : article.category === 'agent' ? 'AGENT 教学' : article.category === 'news' ? '新闻' : '饲养日记'}</span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                    <span className="text-sm text-gray-500">{article.readTime}</span>
                  </div>
                  <h1 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
                    {cleanTitle(article.title)}
                  </h1>
                  <p className="text-base text-gray-600">{article.description}</p>
                </header>

                <MarkdownRenderer content={article.content} />

                {/* 上一篇/下一篇导航 */}
                <nav className="flex flex-col md:flex-row gap-4 justify-between mt-12 pt-8 border-t border-gray-200">
                  {prevArticle ? (
                    <Link to={`/article/${prevArticle.id}`} className="btn-secondary text-center">
                      ← {cleanTitle(prevArticle.title)}
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  {nextArticle ? (
                    <Link to={`/article/${nextArticle.id}`} className="btn-primary text-center">
                      {cleanTitle(nextArticle.title)} →
                    </Link>
                  ) : (
                    <Link to={article.category === 'crawler' ? '/crawler' : article.category === 'agent' ? '/agent' : '/'} className="btn-secondary text-center">
                      返回{article.category === 'crawler' ? '爬虫教学' : article.category === 'agent' ? 'AGENT 教学' : '首页'} →
                    </Link>
                  )}
                </nav>
              </article>
            </div>

            {/* 侧边栏 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-20">
                <h3 className="text-lg font-semibold mb-4 text-gray-900">📖 延伸阅读</h3>
                <div className="space-y-3">
                  {relatedArticles.map((relatedArticle, index) => (
                    <Link
                      key={relatedArticle.id}
                      to={`/article/${relatedArticle.id}`}
                      className={`block p-3 rounded-lg transition-all ${
                        relatedArticle.id === article.id
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
                            {cleanTitle(relatedArticle.title)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                            <span className="badge badge-primary">{relatedArticle.category}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">快速跳转</h4>
                  <div className="space-y-2">
                    <Link to="/" className="block text-sm text-primary-500 hover:text-primary-600 transition-colors">
                      返回首页
                    </Link>
                    <Link to="/crawler" className="block text-sm text-primary-500 hover:text-primary-600 transition-colors">
                      爬虫教学
                    </Link>
                    <Link to="/agent" className="block text-sm text-primary-500 hover:text-primary-600 transition-colors">
                      AGENT 教学
                    </Link>
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
