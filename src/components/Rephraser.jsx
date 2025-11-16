import { useState } from 'react'
import { X, Copy, Check, Loader } from 'lucide-react'
import { generateAllRephrasingsWithGemini } from '../utils/geminiService'

const toneEmojis = {
  formal: '🎩',
  casual: '👋',
  concise: '⚡',
  simple: '✨'
}

const toneDescriptions = {
  formal: 'Professional and formal tone suitable for business communication',
  casual: 'Relaxed and informal tone suitable for friendly conversation',
  concise: 'Shortened and direct tone, removing unnecessary words',
  simple: 'Easy-to-understand tone using simpler vocabulary'
}

function Rephraser({ transcript, onClose, onApplyRephrase }) {
  const [rephrasings, setRephrasings] = useState(null)
  const [selectedTone, setSelectedTone] = useState(null)
  const [isCopied, setIsCopied] = useState(false)
  const [checkedOnce, setCheckedOnce] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const tones = ['formal', 'casual', 'concise', 'simple']

  const handleGenerate = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const generated = await generateAllRephrasingsWithGemini(transcript)
      setRephrasings(generated)
      setCheckedOnce(true)
      setSelectedTone('formal')
    } catch (err) {
      setError(err.message || 'Failed to generate rephrasings')
      console.error('Rephrasing error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyRephrase = async (tone) => {
    if (rephrasings && rephrasings[tone]) {
      await navigator.clipboard.writeText(rephrasings[tone])
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    }
  }

  const handleApplyRephrase = (tone) => {
    if (rephrasings && rephrasings[tone]) {
      onApplyRephrase(rephrasings[tone])
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📝</div>
            <div>
              <h2 className="text-xl font-bold text-white">Text Rephraser (AI Powered)</h2>
              <p className="text-sm text-white/60">Rephrase your text in different tones</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {error && (
            <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-xl mb-4">
              <p className="font-medium">Error: {error}</p>
              <p className="text-sm text-red-100/70 mt-1">Please check your API key configuration and try again.</p>
            </div>
          )}

          {!checkedOnce ? (
            <div className="text-center py-12 space-y-6">
              <div className="space-y-2">
                <div className="text-white/40 text-lg">Generate alternative versions of your text using AI</div>
                <p className="text-white/50 text-sm">Available tones: Formal, Casual, Concise, and Simple</p>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-600/50 text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Rephrasings'
                )}
              </button>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12 space-y-4">
              <Loader className="w-12 h-12 animate-spin text-purple-400 mx-auto" />
              <div className="text-white font-semibold">Generating rephrasings...</div>
              <p className="text-white/60">Please wait while we create alternative versions</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Tone Selection Tabs */}
              <div className="flex gap-2 flex-wrap">
                {tones.map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setSelectedTone(tone)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedTone === tone
                        ? 'bg-purple-600 text-white'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                      }`}
                  >
                    {toneEmojis[tone]} {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </button>
                ))}
              </div>

              {/* Original Text */}
              <div className="space-y-2 mt-6">
                <label className="text-sm text-white/60 uppercase tracking-wide">Original Text</label>
                <div className="bg-black/30 rounded-xl p-4 border border-white/10 text-white/80 text-sm max-h-32 overflow-y-auto font-mono">
                  {transcript}
                </div>
              </div>

              {/* Rephrasings */}
              <div className="space-y-4 mt-6">
                {rephrasings &&
                  tones.map((tone) => (
                    <div key={tone} className={selectedTone === tone ? 'block' : 'hidden'}>
                      <div className="space-y-2 mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{toneEmojis[tone]}</span>
                          <label className="text-sm text-white/60 uppercase tracking-wide">
                            {tone.charAt(0).toUpperCase() + tone.slice(1)} Version
                          </label>
                        </div>
                        <p className="text-xs text-white/40">{toneDescriptions[tone]}</p>
                      </div>
                      <div className="bg-black/30 rounded-xl p-4 border border-white/10 text-white/80 text-sm max-h-40 overflow-y-auto font-mono">
                        {rephrasings[tone]}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => handleCopyRephrase(tone)}
                          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex-1"
                        >
                          <Copy className="w-4 h-4" />
                          {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                          onClick={() => handleApplyRephrase(tone)}
                          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium flex-1"
                        >
                          <Check className="w-4 h-4" />
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Info Box */}
              <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4 mt-6 text-xs text-blue-100">
                <p className="font-semibold mb-1">💡 Tip:</p>
                <p>Use the formal tone for professional communication, casual for friendly messages, concise to remove unnecessary words, and simple for easier-to-understand text.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {checkedOnce && (
          <div className="border-t border-white/10 p-4 bg-black/20 flex justify-end gap-2">
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Rephraser
