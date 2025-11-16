import { useState, useEffect } from 'react'
import '../App.css'
import { useSpeechRecognition } from '../hooks/useSpeechRecognition'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import LanguageSelector from '../components/LanguageSelector'
import FontSizeSelector from '../components/FontSizeSelector'
import TranscriptDisplay from '../components/TranscriptDisplay'
import InlineGrammarDisplay from '../components/InlineGrammarDisplay'
import StatsBar from '../components/StatsBar'
import PlayPauseButton from '../components/PlayPauseButton'
import UtilityButtons from '../components/UtilityButtons'
import ErrorMessage from '../components/ErrorMessage'
import Footer from '../components/Footer'
import NotSupported from '../components/NotSupported'
import DarkVeil from '../components/DarkVeil'
import GrammarDetector from '../components/GrammarDetector'
import Rephraser from '../components/Rephraser'
import { getWordCount, getCharCount } from '../utils/formatters'

function Boliselikh() {
  const [fontSize, setFontSize] = useState('base')
  const [wordCount, setWordCount] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [showGrammarDetector, setShowGrammarDetector] = useState(false)
  const [showRephraser, setShowRephraser] = useState(false)
  const [currentTranscript, setCurrentTranscript] = useState('')
  const [useInlineAnalysis, setUseInlineAnalysis] = useState(true)

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
    setCurrentTranscript(fullText)
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

  const handleApplyGrammarFix = (correctedText) => {
    // This would require modifying the transcript through the hook
    // For now, we'll update the display and the user can copy the corrected version
    setCurrentTranscript(correctedText)
  }

  const handleApplyRephrase = (rephrasedText) => {
    setCurrentTranscript(rephrasedText)
  }

  const changeFontSize = (size) => {
    setFontSize(size)
  }

  if (!isSupported) {
    return <NotSupported />
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
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
      <div style={{ position: 'relative', zIndex: 10, width: '100%' }}>
        <div className="max-w-5xl mx-auto px-4 py-6 md:py-8 mt-24">
          {/* Header */}
          <Header />

          {/* Main Content Container */}
          <div className="mt-8 space-y-6">
            {/* Settings Panel - Glass */}
            <div className="backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl transition-all duration-300">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex-1">
                  <LanguageSelector
                    language={language}
                    onLanguageChange={handleLanguageChange}
                    isListening={isListening}
                  />
                </div>
                <div className="flex-1 md:flex-none">
                  <FontSizeSelector
                    fontSize={fontSize}
                    onFontSizeChange={changeFontSize}
                  />
                </div>
              </div>
            </div>

            {/* Main Editor Panel - Glass */}
            <div className="backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl space-y-6">
              {/* Inline Grammar Display with Analysis */}
              {useInlineAnalysis ? (
                <InlineGrammarDisplay
                  text={currentTranscript || transcript + interimTranscript}
                  onTextChange={(newText) => setCurrentTranscript(newText)}
                  fontSize={fontSize}
                />
              ) : (
                <TranscriptDisplay
                  transcript={transcript}
                  interimTranscript={interimTranscript}
                  isListening={isListening}
                  fontSize={fontSize}
                />
              )}

              {/* Error Message */}
              {error && <ErrorMessage error={error} />}

              {/* Stats Bar - Glass Inner */}
              <div >
                <StatsBar
                  wordCount={wordCount}
                  charCount={charCount}
                  speakingTime={speakingTime}
                />
              </div>

              {/* Play/Pause Button */}
              <PlayPauseButton
                isListening={isListening}
                onToggle={handlePlayPauseToggle}
              />

              {/* Utility Buttons */}
              <UtilityButtons
                transcript={currentTranscript || transcript}
                wordCount={wordCount}
                charCount={charCount}
                language={language}
                speakingTime={speakingTime}
                onClear={handleClear}
                onGrammarCheck={() => setShowGrammarDetector(true)}
                onRephrase={() => setShowRephraser(true)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Grammar Detector Modal */}
      {showGrammarDetector && (
        <GrammarDetector
          transcript={currentTranscript || transcript}
          onClose={() => setShowGrammarDetector(false)}
          onApplyFix={handleApplyGrammarFix}
        />
      )}

      {/* Rephraser Modal */}
      {showRephraser && (
        <Rephraser
          transcript={currentTranscript || transcript}
          onClose={() => setShowRephraser(false)}
          onApplyRephrase={handleApplyRephrase}
        />
      )}

      {/* Footer - Full Width */}
      <Footer />
    </div>
  )
}

export default Boliselikh
