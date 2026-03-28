export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gray-600 mb-2">
          🐾 OpenClaw 饲养日记 - 记录 AI 驯养的每一天
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
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
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  )
}
