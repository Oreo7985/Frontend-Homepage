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
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/CSSExercise" element={<CSSExercise />} />
          <Route path="/instagram" element={<Instagram/>} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
