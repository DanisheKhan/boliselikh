import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-4xl shadow-2xl" style={{ width: '85%', maxWidth: '1100px' }}>
      <div className="px-14 py-4 flex items-center justify-between">
        {/* Logo Section - Clickable */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer transition-opacity">
          <img src="/Logoo.png" alt="Boliselikh" style={{ height: '40px', width: 'auto' }} />
          <span className="text-white text-xl font-semibold">Boliselikh</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link to="/" className="text-white/80 hover:text-white hover:bg-white/10 bg-white/5 px-4 py-2 rounded-xl transition-all duration-200 text-base font-medium">Home</Link>
          <Link to="/about" className="text-white/80 hover:text-white hover:bg-white/10 bg-white/5 px-4 py-2 rounded-xl transition-all duration-200 text-base font-medium">About</Link>
          <a href="#docs" className="text-white/80 hover:text-white hover:bg-white/10 bg-white/5 px-4 py-2 rounded-xl transition-all duration-200 text-base font-medium">Docs</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
