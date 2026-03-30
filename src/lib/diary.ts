export interface Article {
  id: string
  path: string
  order: number
}

export const DIARY_LIST: Article[] = [
  { id: 'model-selection', path: '/assets/diary/00-model-selection-LS0tCmlk.md', order: 0 },
  { id: 'first-chat', path: '/assets/diary/01-first-chat-LS0tCmlk.md', order: 1 },
  { id: 'basic-formula', path: '/assets/diary/02-basic-formula-LS0tCmlk.md', order: 2 },
  { id: 'advanced-tips', path: '/assets/diary/03-advanced-tips-LS0tCmlk.md', order: 3 },
  { id: 'practical-templates', path: '/assets/diary/04-practical-templates-LS0tCmlk.md', order: 4 },
  { id: 'industry-cases', path: '/assets/diary/05-industry-cases-LS0tCmlk.md', order: 5 },
  { id: 'week1-summary', path: '/assets/diary/06-week1-summary-LS0tCmlk.md', order: 6 },
  { id: 'lobster-intern', path: '/assets/diary/07-lobster-intern-LS0tCmlk.md', order: 7 },
  { id: 'unique-lobster', path: '/assets/diary/08-unique-lobster-LS0tCmlk.md', order: 8 },
  { id: 'lobster-memory', path: '/assets/diary/09-lobster-memory-LS0tCmlk.md', order: 9 },
  { id: 'instruction-debugging', path: '/assets/diary/10-instruction-debugging-LS0tCmlk.md', order: 10 },
  { id: 'file-processing', path: '/assets/diary/11-file-processing-LS0tCmlk.md', order: 11 },
  { id: 'data-analysis', path: '/assets/diary/12-data-analysis-LS0tCmlk.md', order: 12 },
  { id: 'week2-summary', path: '/assets/diary/13-week2-summary-LS0tCmlk.md', order: 13 },
  { id: 'ai-cognition-gap', path: '/assets/diary/14-ai-cognition-gap-LS0tCmlk.md', order: 14 },
  { id: 'ai-visual-limitation', path: '/assets/diary/15-ai-visual-limitation-LS0tCmlk.md', order: 15 },
  { id: 'first-automation-script', path: '/assets/diary/16-first-automation-script-LS0tCmlk.md', order: 16 },
  { id: 'optimize-ai-financial-report', path: '/assets/diary/16-optimize-ai-financial-report-LS0tCmlk.md', order: 17 }
]

export interface FullArticle {
  id: string
  title: string
  description: string
  category: string
  order: number
  readTime: string
  content: string
  date?: string
}

export async function loadDiaryArticles(): Promise<FullArticle[]> {
  const articles: FullArticle[] = []
  
  for (const article of DIARY_LIST) {
    try {
      const response = await fetch(article.path)
      const content = await response.text()
      
      const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
      
      if (frontmatterMatch) {
        const frontmatter = frontmatterMatch[1]
        const markdownContent = frontmatterMatch[2]
        
        const metadata: Partial<FullArticle> = {}
        frontmatter.split('\n').forEach((line: string) => {
          const [key, ...valueParts] = line.split(':')
          if (key && valueParts.length) {
            const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '')
            metadata[key.trim() as keyof FullArticle] = value as any
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
      console.error(`Failed to load diary article ${article.id}:`, error)
    }
  }
  
  return articles.sort((a, b) => a.order - b.order)
}

export async function loadDiaryArticleById(id: string): Promise<FullArticle | null> {
  const articles = await loadDiaryArticles()
  return articles.find(a => a.id === id) || null
}
