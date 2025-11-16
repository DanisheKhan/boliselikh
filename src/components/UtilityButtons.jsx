import { useState } from 'react'
import { copyToClipboard, downloadAsText, downloadAsJSON } from '../utils/fileOperations'

function UtilityButtons({
  transcript,
  wordCount,
  charCount,
  language,
  speakingTime,
  onClear,
  onGrammarCheck,
  onRephrase
}) {
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = async () => {
    if (!transcript) return

    const success = await copyToClipboard(transcript)
    if (success) {
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleDownloadText = () => {
    downloadAsText(transcript)
  }

  const handleDownloadJSON = () => {
    downloadAsJSON(transcript, wordCount, charCount, language, speakingTime)
  }

  return (
    <>
      {isCopied && (
        <div className="bg-white/10 backdrop-blur-xl border border-emerald-400/30 text-emerald-100 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300">
          ✓ Copied to clipboard!
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        <button
          onClick={handleCopy}
          disabled={!transcript}
          className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/20 hover:border-white/40 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center disabled:border-white/10 disabled:text-white/30 disabled:cursor-not-allowed"
        >
          Copy
        </button>
        <button
          onClick={handleDownloadText}
          disabled={!transcript}
          className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/20 hover:border-white/40 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center disabled:border-white/10 disabled:text-white/30 disabled:cursor-not-allowed"
        >
          TXT
        </button>
        <button
          onClick={handleDownloadJSON}
          disabled={!transcript}
          className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/20 hover:border-white/40 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center disabled:border-white/10 disabled:text-white/30 disabled:cursor-not-allowed"
        >
          JSON
        </button>
        <button
          onClick={onGrammarCheck}
          disabled={!transcript}
          className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-blue-400/40 hover:border-blue-300/60 text-blue-300 hover:text-blue-200 font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center disabled:border-blue-400/20 disabled:text-blue-400/30 disabled:cursor-not-allowed"
        >
          Grammar
        </button>
        <button
          onClick={onRephrase}
          disabled={!transcript}
          className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-purple-400/40 hover:border-purple-300/60 text-purple-300 hover:text-purple-200 font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center disabled:border-purple-400/20 disabled:text-purple-400/30 disabled:cursor-not-allowed"
        >
          Rephrase
        </button>
        <button
          onClick={onClear}
          disabled={!transcript}
          className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/20 hover:border-white/40 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center disabled:border-white/10 disabled:text-white/30 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </>
  )
}

export default UtilityButtons
