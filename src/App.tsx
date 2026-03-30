import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'
import CommandsPage from './pages/CommandsPage'
import NewsPage from './pages/NewsPage'
import NewsArticlePage from './pages/NewsArticlePage'
import CrawlerPage from './pages/CrawlerPage'
import AgentPage from './pages/AgentPage'
import AgentArticlePage from './pages/AgentArticlePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/article/:id" element={<ArticlePage />} />
        <Route path="/agent" element={<AgentPage />} />
        <Route path="/agent/:id" element={<AgentArticlePage />} />
        <Route path="/commands" element={<CommandsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/news/:id" element={<NewsArticlePage />} />
        <Route path="/crawler" element={<CrawlerPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
