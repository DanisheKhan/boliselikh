import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Boliselikh from './pages/Boliselikh'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boliselikh" element={<Boliselikh />} />
      </Routes>
    </Router>
  )
}

export default App
