import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-xl font-bold text-gray-900 hover:text-primary-500 transition-colors"
          >
            🐾 OpenClaw 饲养日记
          </Link>
          
          <div className="flex items-center space-x-8">
            <a href="#diary" className="text-gray-600 hover:text-primary-500 transition-colors font-medium">
              日记
            </a>
            <a 
              href="https://github.com/bvmjason/ocnote" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-500 transition-colors font-medium"
            >
              社区
            </a>
          </div>
        </div>
      </nav>
    </header>
  )
}
