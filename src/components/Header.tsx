import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              to="/" 
              className="text-lg sm:text-xl font-bold text-gray-900 hover:text-primary-500 transition-colors truncate"
            >
              OpenClaw
            </Link>
            
            {/* 桌面端菜单（隐藏于手机） */}
            <div className="hidden sm:flex items-center space-x-3 md:space-x-4">
              <Link 
                to="/" 
                className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base"
              >
                饲养日记
              </Link>
              <Link 
                to="/news" 
                className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base"
              >
                新闻整理
              </Link>
              <Link 
                to="/agent" 
                className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base"
              >
                AGENT 教学
              </Link>
              <Link 
                to="/crawler" 
                className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base"
              >
                爬虫教学
              </Link>
              <Link 
                to="/commands" 
                className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base"
              >
                常用指令
              </Link>
              <a 
                href="https://github.com/bvmjason/ocnote" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary-500 transition-colors font-medium text-sm md:text-base"
              >
                社群支持
              </a>
            </div>

            {/* 手机端汉堡菜单按钮 */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="sm:hidden p-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-100 transition-colors"
              aria-label="打开菜单"
            >
              {/* 三条杠图标 */}
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* 手机端覆盖式菜单 */}
      {isMenuOpen && (
        <>
          {/* 遮罩层 */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* 菜单面板 */}
          <div className="fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 sm:hidden transform transition-transform duration-300 ease-in-out">
            {/* 菜单头部 */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <span className="text-lg font-bold text-gray-900">OpenClaw</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-primary-500 hover:bg-gray-100 transition-colors"
                aria-label="关闭菜单"
              >
                {/* 关闭图标 X */}
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 菜单内容 */}
            <div className="p-4 space-y-2">
              <Link 
                to="/" 
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>笔记</span>
              </Link>
              <Link 
                to="/news" 
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>新闻</span>
              </Link>
              <Link 
                to="/commands" 
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>指令</span>
              </Link>
              <a 
                href="https://github.com/bvmjason/ocnote" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-gray-700 hover:text-primary-500 hover:bg-primary-50 transition-colors font-medium"
              >
                <span>社群</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  )
}
