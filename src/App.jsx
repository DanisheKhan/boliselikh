import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Boliselikh from './pages/Boliselikh'
import About from './pages/About'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boliselikh" element={<Boliselikh />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
