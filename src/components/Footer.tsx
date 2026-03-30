export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 mb-2">
          🐾 OpenClaw 饲养日记 - 记录 AI 驯养的每一天
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mb-4">
          <a 
            href="https://github.com/bvmjason/ocnote" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-500 transition-colors"
          >
            GitHub
          </a>
          <span>·</span>
          <a 
            href="https://gitee.com/bvm_jason/ocnote" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-500 transition-colors"
          >
            Gitee
          </a>
          <span>·</span>
          <a 
            href="/rss.xml" 
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-500 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20C5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44A15.56 15.56 0 0 1 19.56 20h-2.83A12.73 12.73 0 0 0 4 7.27V4.44m0 5.66a9.9 9.9 0 0 1 9.9 9.9h-2.83A7.07 7.07 0 0 0 4 12.93V10.1z"/>
            </svg>
            RSS
          </a>
          <span>·</span>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  )
}
