import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState('en-US')
  const [error, setError] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const recognitionRef = useRef(null)
  const interimTranscriptRef = useRef('')

  useEffect(() => {
    // Initialize Speech Recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setIsSupported(false)
      setError('Speech Recognition API is not supported in your browser')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true

    recognition.onstart = () => {
      setIsListening(true)
      setError('')
      interimTranscriptRef.current = ''
    }

    recognition.onresult = (event) => {
      let interimTranscript = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptSegment = event.results[i][0].transcript

        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + (prev ? ' ' : '') + transcriptSegment)
        } else {
          interimTranscript += transcriptSegment
        }
      }

      interimTranscriptRef.current = interimTranscript
    }

    recognition.onerror = (event) => {
      setError(`Error: ${event.error}`)
      setIsListening(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      interimTranscriptRef.current = ''
    }

    recognitionRef.current = recognition
  }, [])

  const startListening = () => {
    if (!recognitionRef.current) return

    interimTranscriptRef.current = ''
    recognitionRef.current.lang = language
    recognitionRef.current.start()
  }

  const stopListening = () => {
    if (!recognitionRef.current) return
    recognitionRef.current.stop()
  }

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value
    setLanguage(newLanguage)

    if (isListening) {
      recognitionRef.current.stop()
      setTimeout(() => {
        recognitionRef.current.lang = newLanguage
        recognitionRef.current.start()
      }, 100)
    }
  }

  const copyToClipboard = () => {
    if (!transcript) return

    navigator.clipboard.writeText(transcript).then(() => {
      alert('Text copied to clipboard!')
    }).catch(() => {
      alert('Failed to copy text')
    })
  }

  const downloadAsText = () => {
    if (!transcript) return

    const element = document.createElement('a')
    const file = new Blob([transcript], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `transcript_${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const clearText = () => {
    setTranscript('')
    interimTranscriptRef.current = ''
    setError('')
  }

  if (!isSupported) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Not Supported</h2>
          <p className="text-gray-700">
            Your browser doesn't support the Web Speech API. Please use Chrome, Edge, or Safari.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🎤 Voice to Text
          </h1>
          <p className="text-gray-600">Real-time speech transcription</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {/* Language Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Language
            </label>
            <select
              value={language}
              onChange={handleLanguageChange}
              disabled={isListening}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-white text-gray-700 font-medium disabled:bg-gray-100 disabled:cursor-not-allowed transition"
            >
              <option value="en-US">English (US)</option>
              <option value="hi-IN">हिंदी (Hindi)</option>
              <option value="mr-IN">मराठी (Marathi)</option>
            </select>
          </div>

          {/* Transcript Display */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Transcript
            </label>
            <div className="relative">
              <textarea
                value={transcript + interimTranscriptRef.current}
                readOnly
                className="w-full h-48 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 bg-gray-50 text-gray-800 font-medium resize-none"
                placeholder="Your transcribed text will appear here..."
              />
              {isListening && (
                <div className="absolute top-3 right-3">
                  <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs font-semibold text-green-700">Listening...</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex gap-3">
              <button
                onClick={startListening}
                disabled={isListening}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>▶</span> Start Recording
              </button>
              <button
                onClick={stopListening}
                disabled={!isListening}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-lg transition duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>⏹</span> Stop Recording
              </button>
            </div>
          </div>

          {/* Utility Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={copyToClipboard}
              disabled={!transcript}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-2 px-3 rounded-lg transition duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1"
            >
              <span>📋</span> Copy
            </button>
            <button
              onClick={downloadAsText}
              disabled={!transcript}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold py-2 px-3 rounded-lg transition duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1"
            >
              <span>⬇️</span> Download
            </button>
            <button
              onClick={clearText}
              disabled={!transcript && !error}
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-2 px-3 rounded-lg transition duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1"
            >
              <span>🗑️</span> Clear
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>💡 Click "Start Recording" to begin capturing your voice</p>
          <p className="mt-2">Supports multiple languages for accurate transcription</p>
        </div>
      </div>
    </div>
  )
}

export default App
