import { useState } from 'react'
import { copyToClipboard, downloadAsText, downloadAsJSON } from '../utils/fileOperations'

function UtilityButtons({ transcript, wordCount, charCount, language, speakingTime, onClear }) {
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
        <div className="mb-6 backdrop-blur-lg bg-green-500/20 border border-green-400/50 text-green-100 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300">
          ✅ Copied to clipboard!
        </div>
      )}
      <div className="grid grid-cols-4 gap-3">
        <button
          onClick={handleCopy}
          disabled={!transcript}
          className="backdrop-blur-lg bg-blue-500/20 hover:bg-blue-500/30 disabled:bg-white/5 border border-blue-400/50 disabled:border-white/10 text-blue-100 disabled:text-white/40 font-semibold py-3 px-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1"
        >
          📋 Copy
        </button>
        <button
          onClick={handleDownloadText}
          disabled={!transcript}
          className="backdrop-blur-lg bg-purple-500/20 hover:bg-purple-500/30 disabled:bg-white/5 border border-purple-400/50 disabled:border-white/10 text-purple-100 disabled:text-white/40 font-semibold py-3 px-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1"
        >
          📄 TXT
        </button>
        <button
          onClick={handleDownloadJSON}
          disabled={!transcript}
          className="backdrop-blur-lg bg-indigo-500/20 hover:bg-indigo-500/30 disabled:bg-white/5 border border-indigo-400/50 disabled:border-white/10 text-indigo-100 disabled:text-white/40 font-semibold py-3 px-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1"
        >
          📋 JSON
        </button>
        <button
          onClick={onClear}
          disabled={!transcript}
          className="backdrop-blur-lg bg-orange-500/20 hover:bg-orange-500/30 disabled:bg-white/5 border border-orange-400/50 disabled:border-white/10 text-orange-100 disabled:text-white/40 font-semibold py-3 px-2 rounded-xl transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1"
        >
          🗑️ Clear
        </button>
      </div>
    </>
  )
}

export default UtilityButtons
