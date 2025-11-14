import { useNavigate } from 'react-router-dom'
import DarkVeil from '../components/DarkVeil'

function Home() {
  const navigate = useNavigate()

  const handleNavigateToBoliselikh = () => {
    navigate('/boliselikh')
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      <div style={{ width: '100%', height: '100vh', position: 'absolute', top: 0, left: 0 }}>
        <DarkVeil
          hueShift={0}
          noiseIntensity={0.05}
          scanlineIntensity={0.1}
          speed={0.5}
          scanlineFrequency={2}
          warpAmount={0.3}
        />
      </div>

      {/* Content Overlay */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <div className="px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            🎤 Voice to Text
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Become emboldened by the flame of ambition
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={handleNavigateToBoliselikh}
              className="bg-white hover:bg-gray-100 text-black font-bold py-3 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Get Started
            </button>
            <button
              className="bg-transparent hover:bg-gray-800/50 text-white font-bold py-3 px-8 rounded-full border border-gray-600 transition-all duration-200 hover:scale-105"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
