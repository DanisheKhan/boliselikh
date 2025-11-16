import { useState } from 'react'
import { copyToClipboard, downloadAsText, downloadAsJSON } from '../utils/fileOperations'

function AIToolsButtons({ 
  transcript, 
  wordCount = 0,
  charCount = 0,
  language = 'en-US',
  speakingTime = 0,
  onGrammarCheck, 
  onRephrase,
  onClear
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
    <div className="space-y-4">
      {/* Copy Notification */}
      {isCopied && (
        <div className="bg-white/10 backdrop-blur-xl border border-emerald-400/30 text-emerald-100 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300">
          ✓ Copied to clipboard!
        </div>
      )}

      {/* Main AI Tools - Top Row */}
      <div className="grid grid-cols-2 gap-4 md:gap-6">
        <button
          onClick={onGrammarCheck}
          disabled={!transcript}
          className="bg-linear-to-r from-blue-500/30 to-blue-600/30 hover:from-blue-500/40 hover:to-blue-600/40 backdrop-blur-xl border-2 border-blue-400/60 hover:border-blue-300/80 text-blue-100 hover:text-blue-50 font-bold py-3 px-6 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 disabled:from-blue-500/10 disabled:to-blue-600/10 disabled:border-blue-400/20 disabled:text-blue-400/30 disabled:shadow-none disabled:cursor-not-allowed"
        >
          ✓ Grammar Check
        </button>
        <button
          onClick={onRephrase}
          disabled={!transcript}
          className="bg-linear-to-r from-purple-500/30 to-purple-600/30 hover:from-purple-500/40 hover:to-purple-600/40 backdrop-blur-xl border-2 border-purple-400/60 hover:border-purple-300/80 text-purple-100 hover:text-purple-50 font-bold py-3 px-6 rounded-xl transition-all duration-200 text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-500/20 disabled:from-purple-500/10 disabled:to-purple-600/10 disabled:border-purple-400/20 disabled:text-purple-400/30 disabled:shadow-none disabled:cursor-not-allowed"
        >
          ✨ Rephrase
        </button>
      </div>

      {/* Utility Buttons - Bottom Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
          onClick={onClear}
          disabled={!transcript}
          className="bg-white/10 hover:bg-white/15 backdrop-blur-lg border border-white/20 hover:border-white/40 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center disabled:border-white/10 disabled:text-white/30 disabled:cursor-not-allowed"
        >
          Clear
        </button>
      </div>
    </div>
  )
}

export default AIToolsButtons
