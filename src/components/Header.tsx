import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-900 hover:text-primary-500 transition-colors flex items-center gap-2"
          >
            <span>🐾</span>
            <span>OpenClaw 饲养日记</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#intro" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">
              学习
            </a>
            <a href="#skills" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">
              技能
            </a>
            <a href="#resources" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">
              资源
            </a>
            <Link to="/article/first-chat" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">
              入门教程
            </Link>
            <a 
              href="https://github.com/kaojason/jasoncreative-svg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary !px-4 !py-2 !text-sm"
            >
              ⭐ GitHub
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
