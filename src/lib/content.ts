/// <reference types="vite/client" />

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

// 使用 Vite 的 glob 导入
const modules = import.meta.glob<{ default: string }>('../../content/**/*.md', { eager: true })

export async function loadArticles(): Promise<Article[]> {
  const articles: Article[] = []
  
  for (const [, module] of Object.entries(modules)) {
    const content = module.default
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
