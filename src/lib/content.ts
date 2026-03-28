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
  const modules = import.meta.glob('/content/**/*.md', { eager: true, query: '?raw', import: 'default' })
  
  const articles: Article[] = []
  
  for (const [path, content] of Object.entries(modules)) {
    const frontmatterMatch = (content as string).match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
    
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
