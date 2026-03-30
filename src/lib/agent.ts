export interface Article {
  id: string
  path: string
  order: number
}

export const AGENT_LIST: Article[] = [
  { id: 'intro', path: '/assets/agent/agent-intro-LS0tCmlk.md', order: 200 },
  { id: 'frontend', path: '/assets/agent/agent-frontend-LS0tCmlk.md', order: 201 },
  { id: 'backend', path: '/assets/agent/agent-backend-LS0tCmlk.md', order: 202 },
  { id: 'marketing', path: '/assets/agent/agent-marketing-LS0tCmlk.md', order: 203 },
  { id: 'data', path: '/assets/agent/agent-data-LS0tCmlk.md', order: 204 },
  { id: 'copywriter', path: '/assets/agent/agent-copywriter-LS0tCmlk.md', order: 205 },
  { id: 'solution', path: '/assets/agent/agent-solution-LS0tCmlk.md', order: 206 },
  { id: 'workflow', path: '/assets/agent/agent-workflow-LS0tCmlk.md', order: 207 },
  { id: 'frontend-strict', path: '/assets/agent/agent-frontend-strict-LS0tCmlk.md', order: 208 },
  { id: 'copywriter-humor', path: '/assets/agent/agent-copywriter-humor-LS0tCmlk.md', order: 209 },
  { id: 'copywriter-cute', path: '/assets/agent/agent-copywriter-cute-LS0tCmlk.md', order: 210 },
  { id: 'copywriter-strict', path: '/assets/agent/agent-copywriter-strict-LS0tCmlk.md', order: 211 },
  { id: 'teacher', path: '/assets/agent/agent-teacher-LS0tCmlk.md', order: 212 },
  { id: 'teacher-patient', path: '/assets/agent/agent-teacher-patient-LS0tCmlk.md', order: 213 },
  { id: 'professor', path: '/assets/agent/agent-professor-LS0tCmlk.md', order: 214 },
  { id: 'lecturer', path: '/assets/agent/agent-lecturer-LS0tCmlk.md', order: 215 }
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

export async function loadAgentArticles(): Promise<FullArticle[]> {
  const articles: FullArticle[] = []
  
  for (const article of AGENT_LIST) {
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
          category: metadata.category || 'agent',
          order: article.order,
          readTime: metadata.readTime || '5 分钟',
          date: metadata.date,
          content: markdownContent,
        })
      }
    } catch (error) {
      console.error(`Failed to load agent article ${article.id}:`, error)
    }
  }
  
  return articles.sort((a, b) => a.order - b.order)
}

export async function loadAgentArticleById(id: string): Promise<FullArticle | null> {
  const articles = await loadAgentArticles()
  return articles.find(a => a.id === id) || null
}
