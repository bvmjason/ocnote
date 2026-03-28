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
    path: '/assets/00-model-selection-CY6ArwKS.md',
    order: 0
  },
  {
    id: 'first-chat',
    path: '/assets/01-first-chat-D8sKq2Lp.md',
    order: 1
  },
  {
    id: 'basic-formula',
    path: '/assets/02-basic-formula-JFRaCKVg.md',
    order: 2
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
