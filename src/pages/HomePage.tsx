import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { loadArticles, Article } from '@/lib/content'
import { Search } from '@/lib/Search'

export default function HomePage() {
  const navigate = useNavigate()
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    loadArticles().then(setArticles)
  }, [])

  const handleArticleSelect = (article: Article) => {
    navigate(`/article/${article.id}`)
  }

  const introArticles = articles.filter(a => a.category === 'intro')
  const dimensionCategories = [
    { icon: '📝', title: '文书', desc: '请假条 → 项目周报 → 融资 BP', slug: 'writing' },
    { icon: '🎯', title: '策划', desc: '生日派对 → 营销活动 → 产品上线', slug: 'planning' },
    { icon: '✍️', title: '撰写', desc: '朋友圈文案 → 公众号文章 → 白皮书', slug: 'authoring' },
    { icon: '✂️', title: '润色', desc: '改错别字 → 优化表达 → 风格转换', slug: 'polishing' },
    { icon: '📖', title: '编辑', desc: '校对文章 → 结构调整 → 内容重组', slug: 'editing' },
    { icon: '💻', title: '代码', desc: 'Hello World → API 接口 → 完整项目', slug: 'coding' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-hero text-white py-20 md:py-32">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium">开源免费</span>
            <span className="mx-2">·</span>
            <span className="text-sm font-medium">收录 {articles.length}+ 篇教程</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            OpenClaw 饲养日记
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 opacity-95">
            AI 对话从入门到入土
          </p>
          
          <p className="text-lg md:text-xl mb-10 opacity-90">
            这不是枯燥的技术文档，而是一本教你<strong>如何驯养 AI</strong>的饲养手册。
            像养宠物一样——你得知道它听得懂什么、什么时候会炸毛、怎么让它乖乖听话。
          </p>
          
          {/* 搜索框 */}
          <div className="mb-12">
            <Search articles={articles} onArticleSelect={handleArticleSelect} />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href="#intro" className="btn-primary btn-lg">
              🚀 开始学习
            </a>
            <a href="#dimensions" className="btn-secondary btn-lg !bg-white/20 !text-white !border-white hover:!bg-white/30">
              📚 浏览维度
            </a>
          </div>
          
          {/* 统计数据 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">{articles.length}+</div>
              <div className="text-sm md:text-base opacity-90">教程文章</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">6</div>
              <div className="text-sm md:text-base opacity-90">学习维度</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-sm md:text-base opacity-90">开源免费</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-3xl md:text-4xl font-bold mb-2">∞</div>
              <div className="text-sm md:text-base opacity-90">持续更新</div>
            </div>
          </div>
        </div>
      </section>

      {/* 入门篇 */}
      <section id="intro" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            🏠 入门篇 · 新手村
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            第一次和 AI 说话？从这里开始，保证不翻车
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {introArticles.map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="card group"
              >
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-500 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {article.description}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>⏱️ {article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 六大维度 */}
      <section id="dimensions" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            📐 六大维度 · 全面覆盖
          </h2>
          <p className="text-lg text-gray-600 text-center mb-12">
            从写请假条到写融资 BP，从 Hello World 到全栈项目
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {dimensionCategories.map((item) => (
              <div key={item.title} className="card text-center group">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-4">{item.desc}</p>
                <span className="text-primary-500 font-semibold group-hover:text-primary-600 transition-colors">
                  敬请期待 →
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 特色 */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ✨ 为什么看这个？
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🎭', title: '诙谐幽默', desc: '不是枯燥的技术文档，看的时候真的会笑' },
              { icon: '📚', title: '场景化案例', desc: '每个技巧都有真实场景，学完就能用' },
              { icon: '🔄', title: '持续更新', desc: '开源项目，社区贡献，内容不断增长' },
              { icon: '🎯', title: '即查即用', desc: '遇到问题直接查，Prompt 模板复制就用' },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🚀 开始你的 AI 驯养之旅
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            现在就从入门篇开始，10 分钟掌握和 AI 对话的核心技巧
          </p>
          <Link to={`/article/${introArticles[0]?.id || 'first-chat'}`} className="btn-primary btn-lg">
            开始学习 →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
