export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">OpenClaw 101</h3>
            <p className="text-sm">
              从零开始，7 天掌握你的 AI 私人助理
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">学习</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">入门篇</a></li>
              <li><a href="#" className="hover:text-white transition-colors">进阶篇</a></li>
              <li><a href="#" className="hover:text-white transition-colors">高阶篇</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">资源</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">技能库</a></li>
              <li><a href="#" className="hover:text-white transition-colors">案例库</a></li>
              <li><a href="#" className="hover:text-white transition-colors">工具集</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">社区</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/kaojason/openclaw-diary" className="hover:text-white transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Discord</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2026 OpenClaw 101. MIT License
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <a href="#" className="hover:text-white transition-colors">隐私政策</a>
            <span>·</span>
            <a href="#" className="hover:text-white transition-colors">使用条款</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
