import { useState, useEffect } from 'react'
import '../App.css'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import Header from '../components/Header'
import LanguageSelector from '../components/LanguageSelector'
import FontSizeSelector from '../components/FontSizeSelector'
import TranscriptDisplay from '../components/TranscriptDisplay'
import StatsBar from '../components/StatsBar'
import PlayPauseButton from '../components/PlayPauseButton'
import UtilityButtons from '../components/UtilityButtons'
import ErrorMessage from '../components/ErrorMessage'
import Footer from '../components/Footer'
import NotSupported from '../components/NotSupported'
import { getWordCount, getCharCount } from '../utils/formatters'

function Boliselikh() {
  const [fontSize, setFontSize] = useState('base')
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)

  const {
    transcript,
    interimTranscript,
    isListening,
    language,
    error,
    isSupported,
    speakingTime,
    startListening,
    stopListening,
    handleLanguageChange,
    clearTranscript
  } = useSpeechRecognition()

  // Update word and character counts
  useEffect(() => {
    const fullText = transcript + interimTranscript
    setCharCount(getCharCount(fullText))
    setWordCount(getWordCount(fullText))
  }, [transcript, interimTranscript])

  const handlePlayPauseToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  const handleClear = () => {
    clearTranscript()
  }

  const changeFontSize = (size) => {
    setFontSize(size)
  }

  if (!isSupported) {
    return <NotSupported />
  }

  return (
    <div className="min-h-screen bg-white p-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Header />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Main Editor */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-lg shadow-md p-6 md:p-8">
            {/* Language & Settings Row */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <LanguageSelector
                language={language}
                onLanguageChange={handleLanguageChange}
                isListening={isListening}
              />
              <FontSizeSelector
                fontSize={fontSize}
                onFontSizeChange={changeFontSize}
              />
            </div>

            {/* Transcript Display */}
            <TranscriptDisplay
              transcript={transcript}
              interimTranscript={interimTranscript}
              isListening={isListening}
              fontSize={fontSize}
            />

            {/* Stats Bar */}
            <StatsBar
              wordCount={wordCount}
              charCount={charCount}
              speakingTime={speakingTime}
            />

            {/* Error Message */}
            <ErrorMessage error={error} />

            {/* Play/Pause Button */}
            <PlayPauseButton
              isListening={isListening}
              onToggle={handlePlayPauseToggle}
            />

            {/* Utility Buttons */}
            <UtilityButtons
              transcript={transcript}
              wordCount={wordCount}
              charCount={charCount}
              language={language}
              speakingTime={speakingTime}
              onClear={handleClear}
            />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default Boliselikh
