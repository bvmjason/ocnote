import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ArticlePage from './pages/ArticlePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/intro/first-chat" element={<ArticlePage />} />
        <Route path="/intro/basic-formula" element={<ArticlePage />} />
        <Route path="/intro/common-mistakes" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
