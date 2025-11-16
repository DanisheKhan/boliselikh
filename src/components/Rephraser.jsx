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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <span className="text-2xl">📝</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Text Rephraser</h2>
                <p className="text-sm text-white/70 mt-1">AI-Powered Text Rephrasing</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 backdrop-blur-md rounded-xl transition-all duration-200 border border-transparent hover:border-white/20"
            >
              <X className="w-6 h-6 text-white/60 hover:text-white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {error && (
            <div className="bg-white/5 backdrop-blur-xl border border-red-400/30 text-red-100 px-6 py-4 rounded-2xl flex items-start gap-3">
              <div className="shrink-0 mt-0.5">⚠️</div>
              <div>
                <p className="font-semibold">Error</p>
                <p className="text-sm text-red-100/80 mt-1">{error}</p>
              </div>
            </div>
          )}

          {!checkedOnce ? (
            <div className="text-center py-16 space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <span className="text-4xl">📝</span>
                </div>
              </div>
              <div>
                <p className="text-white/80 text-lg">Ready to rephrase your text?</p>
                <p className="text-white/60 text-sm mt-2">Generate alternative versions in different tones: Formal, Casual, Concise, and Simple</p>
              </div>
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="bg-white/10 hover:bg-white/20 disabled:bg-white/5 backdrop-blur-lg border border-white/30 hover:border-white/50 disabled:border-white/20 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>✨ Generate Rephrasings</>
                )}
              </button>
            </div>
          ) : isLoading ? (
            <div className="text-center py-16 space-y-6">
              <Loader className="w-16 h-16 animate-spin text-blue-300 mx-auto" />
              <div>
                <div className="text-white font-semibold text-lg">Generating rephrasings</div>
                <p className="text-white/60 text-sm mt-2">Please wait while we create alternative versions...</p>
              </div>
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
                        ? 'bg-white/20 backdrop-blur-lg border border-white/40 text-white'
                        : 'bg-white/5 hover:bg-white/10 backdrop-blur-lg text-white/70 border border-white/10 hover:border-white/20'
                      }`}
                  >
                    {toneEmojis[tone]} {tone.charAt(0).toUpperCase() + tone.slice(1)}
                  </button>
                ))}
              </div>

              {/* Original Text */}
              <div className="space-y-2 mt-6">
                <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">Original Text</label>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-white/80 text-sm max-h-32 overflow-y-auto font-mono">
                  {transcript}
                </div>
              </div>

              {/* Rephrasings */}
              <div className="space-y-4 mt-6">
                {rephrasings &&
                  tones.map((tone) => (
                    <div key={tone} className={selectedTone === tone ? 'block' : 'hidden'}>
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{toneEmojis[tone]}</span>
                          <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">
                            {tone.charAt(0).toUpperCase() + tone.slice(1)} Version
                          </label>
                        </div>
                        <p className="text-xs text-white/60">{toneDescriptions[tone]}</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-white/80 text-sm max-h-40 overflow-y-auto font-mono mb-3">
                        {rephrasings[tone]}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCopyRephrase(tone)}
                          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/20 hover:border-white/40 text-white/80 hover:text-white px-4 py-2 rounded-lg transition-all text-sm font-medium flex-1"
                        >
                          <Copy className="w-4 h-4" />
                          {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                        <button
                          onClick={() => handleApplyRephrase(tone)}
                          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-emerald-400/40 hover:border-emerald-300/60 text-emerald-200 hover:text-emerald-100 px-4 py-2 rounded-lg transition-all text-sm font-medium flex-1"
                        >
                          <Check className="w-4 h-4" />
                          Apply
                        </button>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Info Box */}
              <div className="bg-white/5 backdrop-blur-xl border border-blue-400/30 rounded-2xl p-4 mt-6 text-xs text-blue-100">
                <p className="font-semibold mb-2">💡 Tip:</p>
                <p>Use formal tone for professional communication, casual for friendly messages, concise to remove unnecessary words, and simple for easier-to-understand text.</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {checkedOnce && (
          <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 flex justify-end gap-2">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="text-white/70 hover:text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50 inline-flex items-center gap-1.5"
            >
              🔄 Generate Again
            </button>
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/30 hover:border-white/50 text-white px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium"
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
