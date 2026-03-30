import { useState, useEffect } from 'react'

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      // 计算滚动进度
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = scrollTop / docHeight
      setProgress(Math.round(scrollPercent * 100))
    }

    // 监听滚动事件
    window.addEventListener('scroll', updateProgress)
    
    // 初始计算
    updateProgress()

    return () => {
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      {/* 背景条 */}
      <div className="absolute top-0 left-0 w-full h-full bg-gray-200"></div>
      
      {/* 进度条 */}
      <div 
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary-400 to-primary-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      
      {/* 进度百分比（可选，悬停时显示） */}
      <div className="absolute top-2 right-4 text-xs font-medium text-gray-500 bg-white/80 px-2 py-1 rounded-full opacity-0 hover:opacity-100 transition-opacity">
        {progress}%
      </div>
    </div>
  )
}
