import { useState, useRef, useEffect } from 'react'
import './App.css'

function App() {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState('en-US')
  const [error, setError] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [speakingTime, setSpeakingTime] = useState(0)
  const [isCopied, setIsCopied] = useState(false)
  const [histories, setHistories] = useState([])
  const [showHistory, setShowHistory] = useState(false)
  const [fontSize, setFontSize] = useState('base')
  const [theme, setTheme] = useState('light')
  const recognitionRef = useRef(null)
  const interimTranscriptRef = useRef('')
  const timerRef = useRef(null)
  const speakingStartRef = useRef(null)

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
      speakingStartRef.current = Date.now()

      // Start timer for speaking time
      timerRef.current = setInterval(() => {
        setSpeakingTime((prev) => prev + 1)
      }, 1000)
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
      if (timerRef.current) clearInterval(timerRef.current)
    }

    recognition.onend = () => {
      setIsListening(false)
      interimTranscriptRef.current = ''
      if (timerRef.current) clearInterval(timerRef.current)
    }

    recognitionRef.current = recognition

    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('voiceTheme') || 'light'
    setTheme(savedTheme)

    // Load history from localStorage
    const savedHistory = localStorage.getItem('voiceHistory')
    if (savedHistory) {
      setHistories(JSON.parse(savedHistory))
    }
  }, [])

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Update word and character counts
  useEffect(() => {
    const fullText = transcript + interimTranscriptRef.current
    setCharCount(fullText.length)
    setWordCount(fullText.trim() ? fullText.trim().split(/\s+/).length : 0)
  }, [transcript])

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
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }).catch(() => {
      setError('Failed to copy text')
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

    // Add to history
    addToHistory(transcript)
  }

  const downloadAsJSON = () => {
    if (!transcript) return

    const data = {
      timestamp: new Date().toISOString(),
      text: transcript,
      wordCount,
      charCount,
      language,
      speakingTime
    }

    const element = document.createElement('a')
    const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    element.href = URL.createObjectURL(file)
    element.download = `transcript_${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const clearText = () => {
    setTranscript('')
    interimTranscriptRef.current = ''
    setSpeakingTime(0)
    setError('')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const addToHistory = (text) => {
    const newEntry = {
      id: Date.now(),
      text,
      timestamp: new Date().toLocaleString(),
      language,
      wordCount: text.trim() ? text.trim().split(/\s+/).length : 0,
      charCount: text.length
    }

    const updated = [newEntry, ...histories].slice(0, 20)
    setHistories(updated)
    localStorage.setItem('voiceHistory', JSON.stringify(updated))
  }

  const deleteHistoryItem = (id) => {
    const updated = histories.filter(item => item.id !== id)
    setHistories(updated)
    localStorage.setItem('voiceHistory', JSON.stringify(updated))
  }

  const loadHistoryItem = (text) => {
    setTranscript(text)
    setShowHistory(false)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('voiceTheme', newTheme)
  }

  const changeFontSize = (size) => {
    setFontSize(size)
  }

  if (!isSupported) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-linear-to-br from-slate-900 to-slate-800 p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Not Supported</h2>
          <p className="text-gray-700">
            Your browser doesn't support the Web Speech API. Please use Chrome, Edge, or Safari.
          </p>
        </div>
      </div>
    )
  }

  const bgClass = theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-linear-to-br from-slate-50 to-blue-50'
  const cardClass = theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
  const textClass = theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
  const borderClass = theme === 'dark' ? 'border-slate-600' : 'border-gray-300'

  return (
    <div className={`min-h-screen ${bgClass} p-4 transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto">
        {/* Header with Controls */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🎤 Voice to Text
            </h1>
            <p className={`${textClass} text-sm md:text-base`}>Professional speech-to-text transcription</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={toggleTheme}
              className={`p-3 rounded-xl transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              title="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-3 rounded-xl transition-all duration-200 ${theme === 'dark' ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-200 hover:bg-gray-300'}`}
              title="Show history"
            >
              📜
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Main Editor */}
          <div className={`lg:col-span-2 ${cardClass} rounded-3xl shadow-xl p-6 md:p-8 border-2 ${borderClass}`}>
            {/* Language & Settings Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                  Language
                </label>
                <select
                  value={language}
                  onChange={handleLanguageChange}
                  disabled={isListening}
                  className={`w-full px-4 py-3 border-2 ${borderClass} rounded-xl focus:outline-none focus:border-blue-500 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-white text-gray-700'} font-medium disabled:opacity-50 disabled:cursor-not-allowed transition`}
                >
                  <option value="en-US">🇺🇸 English (US)</option>
                  <option value="hi-IN">🇮🇳 हिंदी (Hindi)</option>
                  <option value="mr-IN">🇮🇳 मराठी (Marathi)</option>
                  <option value="es-ES">🇪🇸 Español (Spanish)</option>
                  <option value="fr-FR">🇫🇷 Français (French)</option>
                </select>
              </div>

              {/* Font Size Selector */}
              <div className="flex-1">
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'} mb-2`}>
                  Text Size
                </label>
                <div className="flex gap-2">
                  {['sm', 'base', 'lg'].map((size) => (
                    <button
                      key={size}
                      onClick={() => changeFontSize(size)}
                      className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all ${fontSize === size
                          ? 'bg-blue-500 text-white'
                          : `${theme === 'dark' ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`
                        }`}
                    >
                      {size === 'sm' ? 'A-' : size === 'base' ? 'A' : 'A+'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transcript Display */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className={`block text-sm font-semibold ${theme === 'dark' ? 'text-slate-300' : 'text-gray-700'}`}>
                  Transcript
                </label>
                {isListening && (
                  <div className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
                    Recording...
                  </div>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={transcript + interimTranscriptRef.current}
                  readOnly
                  className={`w-full h-64 px-4 py-3 border-2 ${borderClass} rounded-xl focus:outline-none focus:border-blue-500 ${theme === 'dark' ? 'bg-slate-700 text-white' : 'bg-gray-50 text-gray-800'
                    } font-${fontSize} resize-none`}
                  placeholder="Your transcribed text will appear here..."
                />
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-4 gap-2 mb-6">
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-blue-50'}`}>
                <div className="text-2xl font-bold text-blue-600">{wordCount}</div>
                <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Words</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-purple-50'}`}>
                <div className="text-2xl font-bold text-purple-600">{charCount}</div>
                <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Chars</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-green-50'}`}>
                <div className="text-2xl font-bold text-green-600">{formatTime(speakingTime)}</div>
                <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Time</div>
              </div>
              <div className={`p-3 rounded-lg text-center ${theme === 'dark' ? 'bg-slate-700' : 'bg-orange-50'}`}>
                <div className="text-2xl font-bold text-orange-600">{charCount > 0 ? (charCount / (speakingTime || 1)).toFixed(1) : '0'}</div>
                <div className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>CPM</div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                ❌ {error}
              </div>
            )}

            {/* Copy Confirmation */}
            {isCopied && (
              <div className="mb-6 bg-green-100 border-2 border-green-300 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
                ✅ Copied to clipboard!
              </div>
            )}

            {/* Control Buttons */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                onClick={startListening}
                disabled={isListening}
                className="bg-linear-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>▶️</span> Start
              </button>
              <button
                onClick={stopListening}
                disabled={!isListening}
                className="bg-linear-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <span>⏹️</span> Stop
              </button>
            </div>

            {/* Utility Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={copyToClipboard}
                disabled={!transcript}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
              >
                📋 Copy
              </button>
              <button
                onClick={downloadAsText}
                disabled={!transcript}
                className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
              >
                📄 TXT
              </button>
              <button
                onClick={downloadAsJSON}
                disabled={!transcript}
                className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-400 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
              >
                📋 JSON
              </button>
              <button
                onClick={clearText}
                disabled={!transcript && !error}
                className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
              >
                🗑️ Clear
              </button>
            </div>
          </div>

          {/* Right Panel - History */}
          <div className={`${cardClass} rounded-3xl shadow-xl p-6 border-2 ${borderClass} ${showHistory ? 'block' : 'hidden lg:block'}`}>
            <h3 className={`text-lg font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
              📜 History
            </h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {histories.length === 0 ? (
                <p className={`text-sm ${textClass} text-center py-8`}>No history yet</p>
              ) : (
                histories.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-lg border-2 ${borderClass} cursor-pointer hover:border-blue-500 transition-all ${theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'
                      }`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                          {item.text}
                        </p>
                        <div className={`text-xs ${textClass} mt-1`}>
                          � {item.timestamp}
                        </div>
                        <div className={`text-xs ${textClass}`}>
                          {item.wordCount} words • {item.charCount} chars
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0">
                        <button
                          onClick={() => loadHistoryItem(item.text)}
                          className="p-1 hover:bg-blue-500 hover:text-white rounded transition-colors"
                          title="Load"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => deleteHistoryItem(item.id)}
                          className="p-1 hover:bg-red-500 hover:text-white rounded transition-colors"
                          title="Delete"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className={`text-center mt-8 ${textClass} text-sm`}>
          <p>💡 Click "Start" to begin capturing your voice in real-time</p>
          <p className="mt-2">Supports multiple languages • 100% Client-side • No data collection</p>
        </div>
      </div>
    </div>
  )
}

export default App
