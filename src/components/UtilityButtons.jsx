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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={handleCopy}
          disabled={!transcript}
          className="bg-white text-black hover:bg-gray-100 disabled:bg-white/40 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded-full transition-all duration-200 text-sm flex items-center justify-center gap-1"
        >
          Copy
        </button>
        <button
          onClick={handleDownloadText}
          disabled={!transcript}
          className="bg-white/10 border-2 border-white text-white hover:bg-white/20 disabled:bg-white/5 disabled:border-white/30 disabled:text-white/40 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded-full transition-all duration-200 text-sm flex items-center justify-center gap-1"
        >
          TXT
        </button>
        <button
          onClick={handleDownloadJSON}
          disabled={!transcript}
          className="bg-white text-black hover:bg-gray-100 disabled:bg-white/40 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded-full transition-all duration-200 text-sm flex items-center justify-center gap-1"
        >
          JSON
        </button>
        <button
          onClick={onClear}
          disabled={!transcript}
          className="bg-white/10 border-2 border-white text-white hover:bg-white/20 disabled:bg-white/5 disabled:border-white/30 disabled:text-white/40 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded-full transition-all duration-200 text-sm flex items-center justify-center gap-1"
        >
          Clear
        </button>
      </div>
    </>
  )
}

export default UtilityButtons
