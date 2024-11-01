import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import CSSExercise from './pages/Exercise'
import Instagram from './pages/Instagram'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {/* 移除路径中的前导斜杠 */}
          <Route path="about" element={<About />} />
          <Route path="projects" element={<Projects />} />
          <Route path="cssexercise" element={<CSSExercise />} /> {/* 统一小写 */}
          <Route path="instagram" element={<Instagram/>} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

// 404 组件
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-600 mb-4">Page not found</p>
      <Link to="/" className="text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
}

export default App
