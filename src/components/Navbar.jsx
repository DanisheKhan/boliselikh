import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-40" style={{ backdropFilter: 'blur(20px)', borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.1)', width: '85%', maxWidth: '1100px' }}>
      <div className="px-14 py-4 flex items-center justify-between">
        {/* Logo Section - Clickable */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer transition-opacity">
          <img src="/Logoo.png" alt="Boliselikh" style={{ height: '40px', width: 'auto' }} />
          <span className="text-white text-xl font-semibold">Boliselikh</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-12">
          <Link to="/" className="text-white transition-colors text-base font-medium">Home</Link>
          <a href="#docs" className="text-white transition-colors text-base font-medium">Docs</a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
