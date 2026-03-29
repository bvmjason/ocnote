export interface Article {
  id: string
  title: string
  description: string
  category: string
  order: number
  readTime: string
  content: string
  date?: string
}

// 文章列表（手动维护，确保可靠）
const ARTICLE_LIST = [
  {
    id: 'model-selection',
    path: '/assets/00-model-selection-LS0tCmlk.md',
    order: 0
  },
  {
    id: 'first-chat',
    path: '/assets/01-first-chat-LS0tCmlk.md',
    order: 1
  },
  {
    id: 'basic-formula',
    path: '/assets/02-basic-formula-LS0tCmlk.md',
    order: 2
  },
  {
    id: 'advanced-tips',
    path: '/assets/03-advanced-tips-LS0tCmlk.md',
    order: 3
  },
  {
    id: 'practical-templates',
    path: '/assets/04-practical-templates-LS0tCmlk.md',
    order: 4
  },
  {
    id: 'industry-cases',
    path: '/assets/05-industry-cases-LS0tCmlk.md',
    order: 5
  },
  {
    id: 'week1-summary',
    path: '/assets/06-week1-summary-LS0tCmlk.md',
    order: 6
  },
  {
    id: 'lobster-intern',
    path: '/assets/07-lobster-intern-LS0tCmlk.md',
    order: 7
  },
  {
    id: 'unique-lobster',
    path: '/assets/08-unique-lobster-LS0tCmlk.md',
    order: 8
  },
  {
    id: 'lobster-memory',
    path: '/assets/09-lobster-memory-LS0tCmlk.md',
    order: 9
  },
  {
    id: 'instruction-debugging',
    path: '/assets/10-instruction-debugging-LS0tCmlk.md',
    order: 10
  },
  {
    id: 'file-processing',
    path: '/assets/11-file-processing-LS0tCmlk.md',
    order: 11
  },
  {
    id: 'data-analysis',
    path: '/assets/12-data-analysis-LS0tCmlk.md',
    order: 12
  },
  {
    id: 'week2-summary',
    path: '/assets/13-week2-summary-LS0tCmlk.md',
    order: 13
  },
  {
    id: 'ai-cognition-gap',
    path: '/assets/14-ai-cognition-gap-LS0tCmlk.md',
    order: 14
  },
  {
    id: 'ai-visual-limitation',
    path: '/assets/15-ai-visual-limitation-LS0tCmlk.md',
    order: 15
  }
]

export async function loadArticles(): Promise<Article[]> {
  const articles: Article[] = []
  
  for (const article of ARTICLE_LIST) {
    try {
      const response = await fetch(article.path)
      const content = await response.text()
      
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const markdownContent = frontmatterMatch[2]
        
        const metadata: Partial<Article> = {}
        frontmatter.split('\n').forEach((line: string) => {
          const [key, ...valueParts] = line.split(':')
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
            metadata[key.trim() as keyof Article] = value as any
          }
        })
        
        articles.push({
          id: article.id,
          title: metadata.title || '',
          description: metadata.description || '',
          category: metadata.category || 'intro',
          order: article.order,
          readTime: metadata.readTime || '5 分钟',
          date: metadata.date,
          content: markdownContent,
        })
      }
    } catch (error) {
      console.error(`Failed to load article ${article.id}:`, error)
    }
  }
  
  return articles.sort((a, b) => a.order - b.order)
}

export async function loadArticleById(id: string): Promise<Article | null> {
  const articles = await loadArticles()
  return articles.find(a => a.id === id) || null
}
