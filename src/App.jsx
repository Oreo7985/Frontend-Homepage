import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import CSSExercise from './pages/Exercise'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/Frontend-Homepage/" element={<Home />} />
          <Route path="/Frontend-Homepage/about" element={<About />} />
          <Route path="/Frontend-Homepage/projects" element={<Projects />} />
          <Route path="/Frontend-Homepage/projects/CSSExercise" element={<CSSExercise />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
