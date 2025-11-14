import { useNavigate } from 'react-router-dom'
import DarkVeil from '../components/DarkVeil'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
              BoliseLikh
            </h1>
            <p className="text-lg md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Become emboldened by the flame of ambition
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleNavigateToBoliselikh}
                className="bg-white text-black font-bold py-4 px-10 rounded-full transition-all duration-200"
              >
                Get Started
              </button>
              <button
                className="bg-transparent border-2 border-white text-white font-bold py-4 px-10 rounded-full transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Home
