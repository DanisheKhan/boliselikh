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
        <div className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 px-4 py-3 rounded-lg text-sm font-medium">
          ✅ Copied to clipboard!
        </div>
      )}
      <div className="grid grid-cols-4 gap-2">
        <button
          onClick={handleCopy}
          disabled={!transcript}
          className="bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
        >
          📋 Copy
        </button>
        <button
          onClick={handleDownloadText}
          disabled={!transcript}
          className="bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
        >
          📄 TXT
        </button>
        <button
          onClick={handleDownloadJSON}
          disabled={!transcript}
          className="bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
        >
          📋 JSON
        </button>
        <button
          onClick={onClear}
          disabled={!transcript}
          className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-400 text-white font-semibold py-3 px-2 rounded-lg transition-all duration-200 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-1 shadow-md hover:shadow-lg"
        >
          🗑️ Clear
        </button>
      </div>
    </>
  )
}

export default UtilityButtons
