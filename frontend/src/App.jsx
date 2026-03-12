import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Stack from './pages/Stack'
import Contact from './pages/Contact'
import Experience from './pages/Experience'
import PuzzleGame from './components/PuzzleGame'
import PerformanceChart from './components/PerformanceChart'
import { Nav } from './components/Nav';
import Chatbot from './components/Chatbot';
// import Footer from './components/Footer';
import FloatingLeftFooter from './components/FloatingLeftFooter';

function App() {
  return (
    <Router>
      <FloatingLeftFooter />
      <Nav></Nav>
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/Stack" element={<Stack />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/puzzle" element={<PuzzleGame />} />
          <Route path="/performance" element={<PerformanceChart />} />
        </Routes>
      </main>
      <Chatbot />
    </Router>
  )
}

export default App