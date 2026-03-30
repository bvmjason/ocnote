export interface Article {
  id: string
  path: string
  category: 'diary' | 'agent' | 'news' | 'crawler'
}

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

// 所有文章列表
export const ALL_ARTICLES: Article[] = [
  // Diary articles
  { id: 'model-selection', path: '/assets/diary/00-model-selection-LS0tCmlk.md', category: 'diary' },
  { id: 'first-chat', path: '/assets/diary/01-first-chat-LS0tCmlk.md', category: 'diary' },
  { id: 'basic-formula', path: '/assets/diary/02-basic-formula-LS0tCmlk.md', category: 'diary' },
  { id: 'advanced-tips', path: '/assets/diary/03-advanced-tips-LS0tCmlk.md', category: 'diary' },
  { id: 'practical-templates', path: '/assets/diary/04-practical-templates-LS0tCmlk.md', category: 'diary' },
  { id: 'industry-cases', path: '/assets/diary/05-industry-cases-LS0tCmlk.md', category: 'diary' },
  { id: 'week1-summary', path: '/assets/diary/06-week1-summary-LS0tCmlk.md', category: 'diary' },
  { id: 'lobster-intern', path: '/assets/diary/07-lobster-intern-LS0tCmlk.md', category: 'diary' },
  { id: 'unique-lobster', path: '/assets/diary/08-unique-lobster-LS0tCmlk.md', category: 'diary' },
  { id: 'lobster-memory', path: '/assets/diary/09-lobster-memory-LS0tCmlk.md', category: 'diary' },
  { id: 'instruction-debugging', path: '/assets/diary/10-instruction-debugging-LS0tCmlk.md', category: 'diary' },
  { id: 'file-processing', path: '/assets/diary/11-file-processing-LS0tCmlk.md', category: 'diary' },
  { id: 'data-analysis', path: '/assets/diary/12-data-analysis-LS0tCmlk.md', category: 'diary' },
  { id: 'week2-summary', path: '/assets/diary/13-week2-summary-LS0tCmlk.md', category: 'diary' },
  { id: 'ai-cognition-gap', path: '/assets/diary/14-ai-cognition-gap-LS0tCmlk.md', category: 'diary' },
  { id: 'ai-visual-limitation', path: '/assets/diary/15-ai-visual-limitation-LS0tCmlk.md', category: 'diary' },
  { id: 'first-automation-script', path: '/assets/diary/16-first-automation-script-LS0tCmlk.md', category: 'diary' },
  { id: 'optimize-ai-financial-report', path: '/assets/diary/16-optimize-ai-financial-report-LS0tCmlk.md', category: 'diary' },
  
  // Crawler articles
  { id: 'crawler-intro-what-can-help', path: '/assets/crawler/00-intro-what-can-help-LS0tCmlk.md', category: 'crawler' },
  { id: 'crawler-intro-basic-knowledge', path: '/assets/crawler/01-intro-basic-knowledge-LS0tCmlk.md', category: 'crawler' },
  { id: 'crawler-intro-correct-instruction', path: '/assets/crawler/02-intro-correct-instruction-LS0tCmlk.md', category: 'crawler' },
  { id: 'crawler-intro-step-by-step', path: '/assets/crawler/03-intro-step-by-step-LS0tCmlk.md', category: 'crawler' },
  { id: 'crawler-intro-validation-iteration', path: '/assets/crawler/04-intro-validation-iteration-LS0tCmlk.md', category: 'crawler' },
  { id: 'crawler-intro-24h-operation', path: '/assets/crawler/05-intro-24h-operation-LS0tCmlk.md', category: 'crawler' },
  
  // Agent articles
  { id: 'intro', path: '/assets/agent/agent-intro-LS0tCmlk.md', category: 'agent' },
  { id: 'frontend', path: '/assets/agent/agent-frontend-LS0tCmlk.md', category: 'agent' },
  { id: 'backend', path: '/assets/agent/agent-backend-LS0tCmlk.md', category: 'agent' },
  { id: 'marketing', path: '/assets/agent/agent-marketing-LS0tCmlk.md', category: 'agent' },
  { id: 'data', path: '/assets/agent/agent-data-LS0tCmlk.md', category: 'agent' },
  { id: 'copywriter', path: '/assets/agent/agent-copywriter-LS0tCmlk.md', category: 'agent' },
  { id: 'solution', path: '/assets/agent/agent-solution-LS0tCmlk.md', category: 'agent' },
  { id: 'workflow', path: '/assets/agent/agent-workflow-LS0tCmlk.md', category: 'agent' },
  { id: 'frontend-strict', path: '/assets/agent/agent-frontend-strict-LS0tCmlk.md', category: 'agent' },
  { id: 'copywriter-humor', path: '/assets/agent/agent-copywriter-humor-LS0tCmlk.md', category: 'agent' },
  { id: 'copywriter-cute', path: '/assets/agent/agent-copywriter-cute-LS0tCmlk.md', category: 'agent' },
  { id: 'copywriter-strict', path: '/assets/agent/agent-copywriter-strict-LS0tCmlk.md', category: 'agent' },
  { id: 'teacher', path: '/assets/agent/agent-teacher-LS0tCmlk.md', category: 'agent' },
  { id: 'teacher-patient', path: '/assets/agent/agent-teacher-patient-LS0tCmlk.md', category: 'agent' },
  { id: 'professor', path: '/assets/agent/agent-professor-LS0tCmlk.md', category: 'agent' },
  { id: 'lecturer', path: '/assets/agent/agent-lecturer-LS0tCmlk.md', category: 'agent' }
]

/**
 * 加载所有文章
 */
export async function loadAllArticles(): Promise<FullArticle[]> {
  const articles: FullArticle[] = []
  
  for (const article of ALL_ARTICLES) {
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
          category: metadata.category || article.category,
          order: metadata.order ? parseInt(String(metadata.order)) : 0,
          readTime: metadata.readTime || '5 分钟',
          date: metadata.date,
          content: markdownContent,
        })
      }
    } catch (error) {
      console.error(`Failed to load article ${article.id}:`, error)
    }
  }
  
  return articles.sort((a, b) => {
    // 先按 category 排序，再按 order 排序
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.order - b.order
  })
}

/**
 * 根据 ID 加载文章
 */
export async function loadArticleById(id: string): Promise<FullArticle | null> {
  const articles = await loadAllArticles()
  return articles.find(a => a.id === id) || null
}

/**
 * 根据类别加载文章
 */
export async function loadArticlesByCategory(category: 'diary' | 'agent' | 'news' | 'crawler'): Promise<FullArticle[]> {
  const articles = await loadAllArticles()
  return articles.filter(a => a.category === category)
}
