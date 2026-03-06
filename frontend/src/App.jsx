import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Stack from './pages/Stack'
import Contact from './pages/Contact'
import { Nav } from './components/Nav';
import Chatbot from './components/ChatBot';
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
        </Routes>
      </main>
      <Chatbot />
    </Router>
  )
}

export default App