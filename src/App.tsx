import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Preparing from './sections/Preparing'

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/" element={
          <>
            <Header />
            <main>
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </>
        } />
        <Route path="/preparing" element={<Preparing />} />
      </Routes>
    </div>
  )
}

export default App