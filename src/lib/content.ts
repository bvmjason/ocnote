export interface Article {
  id: string
  title: string
  description: string
  category: string
  order: number
  readTime: string
  content: string
  date?: string
  source?: string
  sourceUrl?: string
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
  },
  {
    id: 'first-automation-script',
    path: '/assets/16-first-automation-script-LS0tCmlk.md',
    order: 16
  },
  {
    id: 'news-2026-03-29-xai',
    path: '/assets/news-2026-03-29-xai-LS0tCmlk.md',
    order: 100
  },
  {
    id: 'news-2026-03-29-rag',
    path: '/assets/news-2026-03-29-rag-LS0tCmlk.md',
    order: 114
  },
  {
    id: 'news-2026-03-29-mobile',
    path: '/assets/news-2026-03-29-mobile-LS0tCmlk.md',
    order: 115
  },
  {
    id: 'news-2026-03-28-plugin',
    path: '/assets/news-2026-03-28-plugin-LS0tCmlk.md',
    order: 101
  },
  {
    id: 'news-2026-03-28-deepseek',
    path: '/assets/news-2026-03-28-deepseek-LS0tCmlk.md',
    order: 116
  },
  {
    id: 'news-2026-03-28-workflow',
    path: '/assets/news-2026-03-28-workflow-LS0tCmlk.md',
    order: 117
  },
  {
    id: 'news-2026-03-27-claude',
    path: '/assets/news-2026-03-27-claude-LS0tCmlk.md',
    order: 102
  },
  {
    id: 'news-2026-03-27-gemini',
    path: '/assets/news-2026-03-27-gemini-LS0tCmlk.md',
    order: 118
  },
  {
    id: 'news-2026-03-27-api-gateway',
    path: '/assets/news-2026-03-27-api-gateway-LS0tCmlk.md',
    order: 120
  },
  {
    id: 'news-2026-03-26-memory',
    path: '/assets/news-2026-03-26-memory-LS0tCmlk.md',
    order: 103
  },
  {
    id: 'news-2026-03-26-clawhub',
    path: '/assets/news-2026-03-26-clawhub-LS0tCmlk.md',
    order: 121
  },
  {
    id: 'news-2026-03-26-coding',
    path: '/assets/news-2026-03-26-coding-LS0tCmlk.md',
    order: 122
  },
  {
    id: 'news-2026-03-25-grok3',
    path: '/assets/news-2026-03-25-grok3-LS0tCmlk.md',
    order: 104
  },
  {
    id: 'news-2026-03-25-auto',
    path: '/assets/news-2026-03-25-auto-LS0tCmlk.md',
    order: 123
  },
  {
    id: 'news-2026-03-25-translate',
    path: '/assets/news-2026-03-25-translate-LS0tCmlk.md',
    order: 124
  },
  {
    id: 'news-2026-03-24-subagent',
    path: '/assets/news-2026-03-24-subagent-LS0tCmlk.md',
    order: 105
  },
  {
    id: 'news-2026-03-24-scheduler',
    path: '/assets/news-2026-03-24-scheduler-LS0tCmlk.md',
    order: 125
  },
  {
    id: 'news-2026-03-24-monitor',
    path: '/assets/news-2026-03-24-monitor-LS0tCmlk.md',
    order: 126
  },
  {
    id: 'news-2026-03-23-voice',
    path: '/assets/news-2026-03-23-voice-LS0tCmlk.md',
    order: 106
  },
  {
    id: 'news-2026-03-23-podcast',
    path: '/assets/news-2026-03-23-podcast-LS0tCmlk.md',
    order: 127
  },
  {
    id: 'news-2026-03-23-meeting',
    path: '/assets/news-2026-03-23-meeting-LS0tCmlk.md',
    order: 128
  },
  {
    id: 'news-2026-03-22-cron',
    path: '/assets/news-2026-03-22-cron-LS0tCmlk.md',
    order: 107
  },
  {
    id: 'news-2026-03-22-analytics',
    path: '/assets/news-2026-03-22-analytics-LS0tCmlk.md',
    order: 129
  },
  {
    id: 'news-2026-03-22-form',
    path: '/assets/news-2026-03-22-form-LS0tCmlk.md',
    order: 130
  },
  {
    id: 'news-2026-03-21-qwen',
    path: '/assets/news-2026-03-21-qwen-LS0tCmlk.md',
    order: 108
  },
  {
    id: 'news-2026-03-21-pdf',
    path: '/assets/news-2026-03-21-pdf-LS0tCmlk.md',
    order: 131
  },
  {
    id: 'news-2026-03-21-crm',
    path: '/assets/news-2026-03-21-crm-LS0tCmlk.md',
    order: 132
  },
  {
    id: 'news-2026-03-20-wecom',
    path: '/assets/news-2026-03-20-wecom-LS0tCmlk.md',
    order: 109
  },
  {
    id: 'news-2026-03-20-slack',
    path: '/assets/news-2026-03-20-slack-LS0tCmlk.md',
    order: 133
  },
  {
    id: 'news-2026-03-20-github',
    path: '/assets/news-2026-03-20-github-LS0tCmlk.md',
    order: 134
  },
  {
    id: 'news-2026-03-19-canvas',
    path: '/assets/news-2026-03-19-canvas-LS0tCmlk.md',
    order: 110
  },
  {
    id: 'news-2026-03-19-notion',
    path: '/assets/news-2026-03-19-notion-LS0tCmlk.md',
    order: 135
  },
  {
    id: 'news-2026-03-19-excel',
    path: '/assets/news-2026-03-19-excel-LS0tCmlk.md',
    order: 136
  },
  {
    id: 'news-2026-03-18-gpt45',
    path: '/assets/news-2026-03-18-gpt45-LS0tCmlk.md',
    order: 111
  },
  {
    id: 'news-2026-03-18-zoom',
    path: '/assets/news-2026-03-18-zoom-LS0tCmlk.md',
    order: 137
  },
  {
    id: 'news-2026-03-18-calendar',
    path: '/assets/news-2026-03-18-calendar-LS0tCmlk.md',
    order: 138
  },
  {
    id: 'news-2026-03-17-security',
    path: '/assets/news-2026-03-17-security-LS0tCmlk.md',
    order: 112
  },
  {
    id: 'news-2026-03-17-backup',
    path: '/assets/news-2026-03-17-backup-LS0tCmlk.md',
    order: 139
  },
  {
    id: 'news-2026-03-17-logging',
    path: '/assets/news-2026-03-17-logging-LS0tCmlk.md',
    order: 140
  },
  {
    id: 'news-2026-03-16-launch',
    path: '/assets/news-2026-03-16-launch-LS0tCmlk.md',
    order: 113
  },
  {
    id: 'news-2026-03-16-extension',
    path: '/assets/news-2026-03-16-extension-LS0tCmlk.md',
    order: 141
  },
  {
    id: 'news-2026-03-16-template',
    path: '/assets/news-2026-03-16-template-LS0tCmlk.md',
    order: 142
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
          source: metadata.source,
          sourceUrl: metadata.sourceUrl,
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
