import { useState, useMemo, useCallback, useEffect } from 'react'
import Fuse from 'fuse.js'

interface Article {
  id: string
  title: string
  description: string
  content: string
}

interface SearchProps {
  articles: Article[]
  onArticleSelect: (article: Article) => void
}

interface SearchResult {
  item: Article
  matches?: readonly any[]
  score?: number
}

export function Search({ articles, onArticleSelect }: SearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const fuse = useMemo(() => {
    return new Fuse(articles, {
      keys: ['title', 'description', 'content'],
      threshold: 0.3,
      includeMatches: true,
      minMatchCharLength: 2,
    })
  }, [articles])

  const results: SearchResult[] = useMemo(() => {
    if (!searchQuery.trim()) return []
    return fuse.search(searchQuery).slice(0, 10)
  }, [searchQuery, fuse])

  const handleSelect = useCallback((article: Article) => {
    onArticleSelect(article)
    setSearchQuery('')
    setIsOpen(false)
    setSelectedIndex(-1)
  }, [onArticleSelect])

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev))
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1))
          break
        case 'Enter':
          if (selectedIndex >= 0 && results[selectedIndex]) {
            e.preventDefault()
            handleSelect(results[selectedIndex].item)
          }
          break
        case 'Escape':
          setIsOpen(false)
          setSelectedIndex(-1)
          break
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, results, selectedIndex, handleSelect])

  // 高亮匹配文本
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    return parts.map((part, i) => 
      regex.test(part) ? (
        <mark key={i} className="bg-yellow-200 text-gray-900 px-0.5 rounded">{part}</mark>
      ) : (
        part
      )
    )
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
            setSelectedIndex(-1)
          }}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="搜索文章内容... (↑↓ 选择，Enter 确认)"
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
          {results.map((result, index) => {
            const article = result.item
            const isSelected = index === selectedIndex
            return (
              <button
                key={article.id}
                onClick={() => handleSelect(article)}
                className={`w-full px-6 py-4 text-left transition-colors border-b border-gray-100 last:border-b-0 ${
                  isSelected ? 'bg-primary-50' : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">
                  {highlightText(article.title, searchQuery)}
                </div>
                <div className="text-sm text-gray-600">
                  {highlightText(article.description, searchQuery)}
                </div>
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
