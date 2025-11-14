function Footer() {
  return (
    <footer className="relative z-20 bg-black/40 backdrop-blur-lg border-t border-white/10 py-12 px-4 mt-8 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-2">🎤 Boliselikh</h2>
            <p className="text-white/60 text-sm mb-4">Professional speech-to-text transcription powered by AI.</p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75-2.35 7-5 7-5s-1.54.03-2.75.03C19 11 21 8 21 8s.75 2 2 3v-1a4.5 4.5 0 00-.5-3z" />
                </svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/60 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="#pricing" className="text-white/60 hover:text-white text-sm transition-colors">Pricing</a></li>
              <li><a href="#security" className="text-white/60 hover:text-white text-sm transition-colors">Security</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-white/60 hover:text-white text-sm transition-colors">About</a></li>
              <li><a href="#blog" className="text-white/60 hover:text-white text-sm transition-colors">Blog</a></li>
              <li><a href="#careers" className="text-white/60 hover:text-white text-sm transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#docs" className="text-white/60 hover:text-white text-sm transition-colors">Documentation</a></li>
              <li><a href="#api" className="text-white/60 hover:text-white text-sm transition-colors">API Reference</a></li>
              <li><a href="#support" className="text-white/60 hover:text-white text-sm transition-colors">Support</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#privacy" className="text-white/60 hover:text-white text-sm transition-colors">Privacy</a></li>
              <li><a href="#terms" className="text-white/60 hover:text-white text-sm transition-colors">Terms</a></li>
              <li><a href="#license" className="text-white/60 hover:text-white text-sm transition-colors">License</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Boliselikh. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#status" className="text-white/60 hover:text-white text-sm transition-colors">Status</a>
            <span className="text-white/30">•</span>
            <a href="#contact" className="text-white/60 hover:text-white text-sm transition-colors">Contact</a>
            <span className="text-white/30">•</span>
            <a href="#feedback" className="text-white/60 hover:text-white text-sm transition-colors">Feedback</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
