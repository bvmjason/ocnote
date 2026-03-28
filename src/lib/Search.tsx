import { useState, useMemo } from 'react'
import Fuse from 'fuse.js'
import { Article } from './content'

interface SearchProps {
  articles: Article[]
  onArticleSelect: (article: Article) => void
}

export function Search({ articles, onArticleSelect }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const fuse = useMemo(() => {
    return new Fuse(articles, {
      keys: ['title', 'description', 'content'],
      threshold: 0.3,
      includeMatches: true,
      minMatchCharLength: 2,
    })
  }, [articles])

  const results = useMemo(() => {
    if (!searchQuery.trim()) return []
    return fuse.search(searchQuery).slice(0, 10)
  }, [searchQuery, fuse])

  const handleSelect = (article: Article) => {
    onArticleSelect(article)
    setSearchQuery('')
    setIsOpen(false)
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="搜索文章内容..."
          className="input w-full pl-12 pr-4 py-3 text-lg"
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 max-h-96 overflow-y-auto z-50">
          {results.map((result) => {
            const article = result.item
            return (
              <button
                key={article.id}
                onClick={() => handleSelect(article)}
                className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="font-semibold text-gray-900 mb-1">{article.title}</div>
                <div className="text-sm text-gray-600">{article.description}</div>
                {result.matches && (
                  <div className="mt-2 text-xs text-primary-500">
                    找到 {result.matches.length} 处匹配
                  </div>
                )}
              </button>
            )
          })}
        </div>
      )}

      {isOpen && searchQuery && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-200 p-6 text-center z-50">
          <div className="text-gray-500">没有找到相关内容</div>
        </div>
      )}
    </div>
  )
}
