import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/atom-one-dark.css'

export interface Article {
  id: string
  title: string
  description: string
  category: string
  order: number
  readTime: string
  content: string
}

export async function loadArticles(): Promise<Article[]> {
  const modules = import.meta.glob('@/content/**/*.md', { eager: true, as: 'raw' })
  
  const articles: Article[] = []
  
  for (const [path, content] of Object.entries(modules)) {
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    
    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1]
      const markdownContent = frontmatterMatch[2]
      
      const metadata: Partial<Article> = {}
      frontmatter.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':')
        if (key && valueParts.length) {
          const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
          metadata[key.trim() as keyof Article] = value as any
        }
      })
      
      articles.push({
        id: metadata.id || '',
        title: metadata.title || '',
        description: metadata.description || '',
        category: metadata.category || '',
        order: parseInt(metadata.order?.toString() || '0'),
        readTime: metadata.readTime || '',
        content: markdownContent,
      })
    }
  }
  
  return articles.sort((a, b) => a.order - b.order)
}

export async function loadArticleById(id: string): Promise<Article | null> {
  const articles = await loadArticles()
  return articles.find(a => a.id === id) || null
}

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ node, ...props }) => (
            <h1 className="text-4xl font-bold mb-6 text-gray-900" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-2xl font-semibold mt-12 mb-6 text-gray-900" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-xl font-semibold mt-8 mb-4 text-gray-900" {...props} />
          ),
          p: ({ node, ...props }) => (
            <p className="text-gray-700 leading-relaxed mb-6" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul className="list-disc list-inside mb-6 space-y-2" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="list-decimal list-inside mb-6 space-y-2" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="text-gray-700" {...props} />
          ),
          blockquote: ({ node, ...props }) => (
            <blockquote className="border-l-4 border-primary-500 pl-6 py-4 my-8 bg-primary-50 rounded-r-lg italic text-gray-700" {...props} />
          ),
          pre: ({ node, ...props }) => (
            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto my-6" {...props} />
          ),
          code: ({ node, inline, ...props }: any) => (
            inline ? (
              <code className="bg-gray-100 text-gray-800 px-2 py-1 rounded font-mono text-sm" {...props} />
            ) : (
              <code {...props} />
            )
          ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-6">
              <table className="table-modern" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="px-6 py-4 text-left font-semibold text-gray-900 bg-gray-50 border-b border-gray-200" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-6 py-4 border-b border-gray-200 text-gray-700" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
