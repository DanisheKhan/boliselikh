import { useNavigate } from 'react-router-dom'
import DarkVeil from '../components/DarkVeil'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const members = [
  { id: 1, name: 'Member One', role: 'Core Team', image: '/members/1.jpg' },
  { id: 2, name: 'Member Two', role: 'Operations', image: '/members/2.jpg' },
  { id: 3, name: 'Member Three', role: 'Research', image: '/members/3.jpg' },
  { id: 4, name: 'Member Four', role: 'Strategy', image: '/members/4.jpg' },
  { id: 5, name: 'Member Five', role: 'Design', image: '/members/5.jpg' }
]

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

        {/* Members Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="uppercase tracking-wide text-sm text-gray-400">Core Team</p>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4">Meet the Members</h2>
              <p className="text-gray-300 max-w-3xl mx-auto">
                BoliseLikh thrives because of the passionate people behind it. Each member brings
                unique expertise to help build experiences that inspire ambition.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="bg-white/5 backdrop-blur rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                >
                  <div className="relative h-64 w-full">
                    <img
                      src={member.image}
                      alt={`${member.name} portrait`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent" />
                  </div>
                  <div className="p-6 text-left">
                    <p className="text-sm uppercase tracking-widest text-indigo-300 mb-2">{member.role}</p>
                    <h3 className="text-2xl font-semibold">{member.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Home
