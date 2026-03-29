import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import CommandsPage from './pages/CommandsPage'
import NewsPage from './pages/NewsPage'
import NewsArticlePage from './pages/NewsArticlePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/commands" element={<CommandsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsArticlePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
