import { Link } from 'react-router-dom'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-12">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-12">
            <h1 className="text-4xl font-bold mb-4">
              💬 第一次和 AI 说话
            </h1>
            <p className="text-gray-600">
              入门篇 · 预计阅读时间：5 分钟
            </p>
          </header>

          <div className="prose prose-lg max-w-none">
            <blockquote className="border-l-4 border-primary-500 pl-6 py-4 my-8 bg-primary-50 rounded-r-lg italic text-gray-700">
              想象你在教一个特别聪明但没社会经验的实习生。
            </blockquote>

            <h2 className="text-2xl font-bold mt-12 mb-6">🤔 AI 不是搜索引擎</h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              很多人第一次用 AI 时，会把它当 Google 用：
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`❌ "在吗？"
❌ "帮我查一下天气"
❌ "那个谁，就是写代码很厉害的那个"`}</code>
            </pre>

            <p className="text-gray-700 leading-relaxed mb-6">
              然后 AI 就懵了：
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`🤖 "请问您具体需要查询哪个城市的天气？"
🤖 "请问您说的是哪位开发者？"`}</code>
            </pre>

            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>AI 不是搜索引擎，它是一个需要明确指令的执行器。</strong>
            </p>

            <h2 className="text-2xl font-bold mt-12 mb-6">✅ 正确的打开方式</h2>

            <h3 className="text-xl font-semibold mt-8 mb-4">1. 别问"在吗"，直接说事</h3>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`❌ "在吗？"
✅ "帮我写一封请假邮件，明天要去看医生"`}</code>
            </pre>

            <h3 className="text-xl font-semibold mt-8 mb-4">2. 给 AI 一个身份</h3>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`❌ "写个文案"
✅ "你是一个资深文案，帮我写一个小红书风格的咖啡店推广文案"`}</code>
            </pre>

            <h3 className="text-xl font-semibold mt-8 mb-4">3. 说清楚你要什么</h3>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`❌ "写得好点"
✅ "用轻松幽默的语气，200 字以内，目标受众是 25-35 岁的上班族"`}</code>
            </pre>

            <h2 className="text-2xl font-bold mt-12 mb-6">🎯 万能公式</h2>

            <div className="bg-primary-50 border-l-4 border-primary-500 p-6 rounded-r-lg mb-6">
              <p className="font-semibold text-gray-900">
                [角色] + [任务] + [要求] = 好 Prompt
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-6">
              举个例子：
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`你是一个健身教练（角色），
帮我制定一个减脂计划（任务），
要求每周 3 次训练，每次 30 分钟，不需要器械（要求）。`}</code>
            </pre>

            <h2 className="text-2xl font-bold mt-12 mb-6">🚗 常见翻车现场</h2>

            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse bg-white rounded-lg shadow-md overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">错误示范</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">问题</th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900 border-b border-gray-200">正确姿势</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 border-b border-gray-200">"随便"</td>
                    <td className="px-6 py-4 border-b border-gray-200">AI 最恨的词</td>
                    <td className="px-6 py-4 border-b border-gray-200">给出具体选项或偏好</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 border-b border-gray-200">"写得好点"</td>
                    <td className="px-6 py-4 border-b border-gray-200">太模糊</td>
                    <td className="px-6 py-4 border-b border-gray-200">"用更正式/幽默/简洁的语气"</td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">一次让 AI 干 10 件事</td>
                    <td className="px-6 py-4">AI 会懵</td>
                    <td className="px-6 py-4">一次说一件事，或分步骤</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold mt-12 mb-6">📝 课后练习</h2>

            <p className="text-gray-700 leading-relaxed mb-6">
              试试用下面的模板，让 AI 帮你写点什么：
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`你是一个{角色}，
帮我{任务}，
要求{具体要求 1}、{具体要求 2}、{具体要求 3}。`}</code>
            </pre>

            <p className="text-gray-700 leading-relaxed mb-6">
              比如：
            </p>

            <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto mb-6">
              <code>{`你是一个新媒体编辑，
帮我写一篇关于"远程办公"的公众号文章开头，
要求 300 字以内、用轻松幽默的语气、目标受众是 25-35 岁的互联网从业者。`}</code>
            </pre>
          </div>

          <nav className="flex flex-col sm:flex-row gap-4 justify-between mt-12 pt-8 border-t border-gray-200">
            <Link to="/" className="btn-secondary text-center">
              ← 返回首页
            </Link>
            <Link to="/intro/basic-formula" className="btn-primary text-center">
              下一篇：基础指令公式 →
            </Link>
          </nav>
        </article>
      </main>

      <Footer />
    </div>
  )
}
