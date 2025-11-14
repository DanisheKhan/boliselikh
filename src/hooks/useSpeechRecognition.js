import { useState, useRef, useEffect } from 'react'

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [language, setLanguage] = useState('en-US')
  const [error, setError] = useState('')
  const [isSupported, setIsSupported] = useState(true)
  const [speakingTime, setSpeakingTime] = useState(0)
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

    // Cleanup timer on unmount
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
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

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage)

    if (isListening) {
      recognitionRef.current.stop()
      setTimeout(() => {
        recognitionRef.current.lang = newLanguage
        recognitionRef.current.start()
      }, 100)
    }
  }

  const clearTranscript = () => {
    setTranscript('')
    interimTranscriptRef.current = ''
    setSpeakingTime(0)
    setError('')
  }

  return {
    transcript,
    interimTranscript: interimTranscriptRef.current,
    isListening,
    language,
    error,
    isSupported,
    speakingTime,
    startListening,
    stopListening,
    handleLanguageChange,
    clearTranscript,
    setError
  }
}
