import { useNavigate } from 'react-router-dom'
import DarkVeil from '../components/DarkVeil'
import Navbar from '../components/Navbar'

function Home() {
  const navigate = useNavigate()

  const handleNavigateToBoliselikh = () => {
    navigate('/boliselikh')
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      {/* DarkVeil Background - Fixed */}
      <div style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.05}
          scanlineIntensity={0.1}
          speed={0.5}
          scanlineFrequency={2}
          warpAmount={0.3}
        />
      </div>

      {/* Navbar */}
      <Navbar />

      {/* Content Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          textAlign: 'center'
        }}
      >
        {/* Main Hero Section - Full Height */}
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="px-4">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img src="/Logoo.png" alt="Boliselikh Logo" style={{ height: '120px', width: 'auto' }} />
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
              Voice to Text
            </h1>
            <p className="text-lg md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Become emboldened by the flame of ambition
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleNavigateToBoliselikh}
                className="bg-white text-black font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg"
              >
                Get Started
              </button>
              <button
                className="bg-transparent text-white font-bold py-4 px-10 rounded-full border-2 border-white transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
              {/* Brand Section */}
              <div className="md:col-span-1">
                <h2 className="text-2xl font-bold text-white mb-2">🎤 Boliselikh</h2>
                <p className="text-gray-400 text-sm mb-4">Professional speech-to-text transcription powered by AI.</p>
                <div className="flex gap-4">
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.35 7-5 7-5s-1.54.03-2.75.03C19 11 21 8 21 8s.75 2 2 3v-1a4.5 4.5 0 00-.5-3z" />
                    </svg>
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.361a19.8 19.8 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.211.375-.445.865-.607 1.252a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.252.077.077 0 0 0-.079-.037A19.773 19.773 0 0 0 3.677 4.36a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.08.08 0 0 0 .087-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 0 0-.042-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.294.075.075 0 0 1 .078-.01c3.928 1.793 8.18 1.793 12.062 0a.075.075 0 0 1 .079.009c.12.098.246.198.373.294a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.076.076 0 0 0-.041.107c.36.699.769 1.364 1.226 1.994a.076.076 0 0 0 .084.028 19.86 19.86 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-4.718-.838-8.813-3.549-12.676a.06.06 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-.965-2.157-2.156 0-1.193.960-2.157 2.157-2.157 1.199 0 2.167.964 2.157 2.157 0 1.191-.958 2.156-2.157 2.156zm7.975 0c-1.183 0-2.157-.965-2.157-2.156 0-1.193.960-2.157 2.157-2.157 1.198 0 2.167.964 2.157 2.157 0 1.191-.959 2.156-2.157 2.156z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Product Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Product</h3>
                <ul className="space-y-2">
                  <li><a href="#features" className="text-gray-400 text-sm transition-colors">Features</a></li>
                  <li><a href="#pricing" className="text-gray-400 text-sm transition-colors">Pricing</a></li>
                  <li><a href="#security" className="text-gray-400 text-sm transition-colors">Security</a></li>
                  <li><a href="#enterprise" className="text-gray-400 text-sm transition-colors">Enterprise</a></li>
                </ul>
              </div>

              {/* Company Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-gray-400 text-sm transition-colors">About</a></li>
                  <li><a href="#blog" className="text-gray-400 text-sm transition-colors">Blog</a></li>
                  <li><a href="#careers" className="text-gray-400 text-sm transition-colors">Careers</a></li>
                  <li><a href="#press" className="text-gray-400 text-sm transition-colors">Press</a></li>
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Resources</h3>
                <ul className="space-y-2">
                  <li><a href="#docs" className="text-gray-400 text-sm transition-colors">Documentation</a></li>
                  <li><a href="#api" className="text-gray-400 text-sm transition-colors">API Reference</a></li>
                  <li><a href="#community" className="text-gray-400 text-sm transition-colors">Community</a></li>
                  <li><a href="#support" className="text-gray-400 text-sm transition-colors">Support</a></li>
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Legal</h3>
                <ul className="space-y-2">
                  <li><a href="#privacy" className="text-gray-400 text-sm transition-colors">Privacy</a></li>
                  <li><a href="#terms" className="text-gray-400 text-sm transition-colors">Terms</a></li>
                  <li><a href="#cookies" className="text-gray-400 text-sm transition-colors">Cookies</a></li>
                  <li><a href="#license" className="text-gray-400 text-sm transition-colors">License</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} Boliselikh. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#status" className="text-gray-400 text-sm transition-colors">Status</a>
                <span className="text-gray-600">•</span>
                <a href="#contact" className="text-gray-400 text-sm transition-colors">Contact</a>
                <span className="text-gray-600">•</span>
                <a href="#feedback" className="text-gray-400 text-sm transition-colors">Feedback</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Home
