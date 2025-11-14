import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import DarkVeil from '../components/DarkVeil'

function About() {
  const navigate = useNavigate()

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
      <div style={{ position: 'relative', zIndex: 10, width: '100%', color: 'white' }}>
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl w-full">
            <div className="text-center mb-16">
              <h1 className="text-6xl md:text-7xl font-bold mb-6">About BoliseLikh</h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                Empowering Communication Through Advanced Speech Recognition
              </p>
            </div>

            {/* Mission Section */}
            <div className="backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl mb-8">
              <h2 className="text-4xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                At BoliseLikh, we believe that the power of your voice should transcend all barriers. Our mission is to provide cutting-edge speech-to-text transcription technology that transforms spoken words into written text with remarkable accuracy and speed.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We are dedicated to democratizing professional transcription services, making them accessible to everyone—whether you're a content creator, student, professional, or someone who simply wants to capture and preserve their thoughts effortlessly.
              </p>
            </div>

            {/* Features Section */}
            <div className="backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl mb-8">
              <h2 className="text-4xl font-bold mb-6 text-white">Why Choose BoliseLikh?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Feature 1 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-3 text-white">High Accuracy</h3>
                  <p className="text-gray-400">
                    Advanced AI-powered speech recognition delivers industry-leading accuracy across multiple languages and accents.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-3 text-white">Real-Time Transcription</h3>
                  <p className="text-gray-400">
                    Watch your words appear as you speak with minimal latency. Seamless, instant, and responsive transcription.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold mb-3 text-white">Multi-Language Support</h3>
                  <p className="text-gray-400">
                    Support for numerous languages ensures accessibility for global audiences. Break language barriers with ease.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold mb-3 text-white">Privacy First</h3>
                  <p className="text-gray-400">
                    Your privacy is our priority. All transcriptions are processed securely with enterprise-grade encryption.
                  </p>
                </div>

                {/* Feature 5 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4">📊</div>
                  <h3 className="text-xl font-bold mb-3 text-white">Detailed Analytics</h3>
                  <p className="text-gray-400">
                    Track speaking time, word count, character count, and more with comprehensive statistics and insights.
                  </p>
                </div>

                {/* Feature 6 */}
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-4">🎨</div>
                  <h3 className="text-xl font-bold mb-3 text-white">User-Friendly Interface</h3>
                  <p className="text-gray-400">
                    Intuitive design meets powerful functionality. Transcribe with a single click—no technical knowledge required.
                  </p>
                </div>
              </div>
            </div>

            {/* Use Cases Section */}
            <div className="backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl mb-8">
              <h2 className="text-4xl font-bold mb-6 text-white">Perfect For</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📝</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Content Creators</h3>
                    <p className="text-gray-400">Transform podcasts, videos, and audio content into searchable, shareable transcripts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎓</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Students & Educators</h3>
                    <p className="text-gray-400">Capture lectures, notes, and study sessions effortlessly for better learning outcomes.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💼</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Business Professionals</h3>
                    <p className="text-gray-400">Streamline meetings, interviews, and conference documentation with precise transcription.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🎙️</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">Journalists & Researchers</h3>
                    <p className="text-gray-400">Accurately capture and archive interviews and research sessions for future reference.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Values Section */}
            <div className="backdrop-blur-xl border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl mb-8">
              <h2 className="text-4xl font-bold mb-6 text-white">Our Core Values</h2>
              <div className="space-y-4">
                <div className="pb-4 border-b border-white/10 last:border-b-0">
                  <h3 className="text-2xl font-bold text-white mb-2">🔥 Innovation</h3>
                  <p className="text-gray-400">
                    We continuously push the boundaries of what's possible with AI and machine learning technology.
                  </p>
                </div>
                <div className="pb-4 border-b border-white/10 last:border-b-0">
                  <h3 className="text-2xl font-bold text-white mb-2">✨ Accessibility</h3>
                  <p className="text-gray-400">
                    Professional-grade transcription should be available to everyone, regardless of background or resources.
                  </p>
                </div>
                <div className="pb-4 border-b border-white/10 last:border-b-0">
                  <h3 className="text-2xl font-bold text-white mb-2">🛡️ Trust</h3>
                  <p className="text-gray-400">
                    Your data is sacred. We maintain the highest standards of security and privacy protection.
                  </p>
                </div>
                <div className="pb-4 border-b border-white/10 last:border-b-0">
                  <h3 className="text-2xl font-bold text-white mb-2">🎯 Reliability</h3>
                  <p className="text-gray-400">
                    Consistent, dependable performance you can rely on every single time you use BoliseLikh.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Voice into Text?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust BoliseLikh for their transcription needs. Start for free today!
              </p>
              <button
                onClick={() => navigate('/boliselikh')}
                className="bg-white text-black font-bold py-4 px-12 rounded-full transition-all duration-200 hover:bg-gray-100 transform hover:scale-105"
              >
                Start Transcribing Now
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} BoliseLikh. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#status" className="text-gray-400 text-sm transition-colors hover:text-white">Status</a>
                <span className="text-gray-600">•</span>
                <a href="#contact" className="text-gray-400 text-sm transition-colors hover:text-white">Contact</a>
                <span className="text-gray-600">•</span>
                <a href="#feedback" className="text-gray-400 text-sm transition-colors hover:text-white">Feedback</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default About
