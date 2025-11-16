import { useState } from 'react'
import { X, Check, AlertCircle, Loader, ArrowRight, CheckCircle2, AlertTriangle } from 'lucide-react'
import { detectGrammarIssuesWithGemini } from '../utils/geminiService'

function GrammarDetector({ transcript, onClose, onApplyFix }) {
  const [issues, setIssues] = useState([])
  const [checkedOnce, setCheckedOnce] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleDetect = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const detectedIssues = await detectGrammarIssuesWithGemini(transcript)
      setIssues(detectedIssues)
      setCheckedOnce(true)
    } catch (err) {
      setError(err.message || 'Failed to detect grammar issues')
      console.error('Grammar detection error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDismiss = (issueIndex) => {
    const updatedIssues = issues.filter((_, idx) => idx !== issueIndex)
    setIssues(updatedIssues)
  }

  const getSeverityConfig = (severity) => {
    const configs = {
      high: {
        bg: 'bg-white/5 backdrop-blur-xl',
        border: 'border-red-400/30',
        text: 'text-red-200',
        badge: 'bg-white/10 backdrop-blur-md text-red-300 border border-red-400/40',
        icon: <AlertTriangle className="w-5 h-5 text-red-400" />,
        wrongBg: 'bg-white/5 backdrop-blur-md border border-red-400/20',
        correctBg: 'bg-white/5 backdrop-blur-md border border-emerald-400/20'
      },
      medium: {
        bg: 'bg-white/5 backdrop-blur-xl',
        border: 'border-yellow-400/30',
        text: 'text-yellow-200',
        badge: 'bg-white/10 backdrop-blur-md text-yellow-300 border border-yellow-400/40',
        icon: <AlertCircle className="w-5 h-5 text-yellow-400" />,
        wrongBg: 'bg-white/5 backdrop-blur-md border border-yellow-400/20',
        correctBg: 'bg-white/5 backdrop-blur-md border border-emerald-400/20'
      },
      low: {
        bg: 'bg-white/5 backdrop-blur-xl',
        border: 'border-blue-400/30',
        text: 'text-blue-200',
        badge: 'bg-white/10 backdrop-blur-md text-blue-300 border border-blue-400/40',
        icon: <AlertCircle className="w-5 h-5 text-blue-400" />,
        wrongBg: 'bg-white/5 backdrop-blur-md border border-blue-400/20',
        correctBg: 'bg-white/5 backdrop-blur-md border border-emerald-400/20'
      }
    }
    return configs[severity] || configs.low
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-lg z-50 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col">
        
        {/* Header - Glass Theme */}
        <div className="bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20">
                <AlertCircle className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Grammar Checker</h2>
                <p className="text-sm text-white/70 mt-1">AI-Powered Grammar Analysis</p>
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
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
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
                  <AlertCircle className="w-16 h-16 text-blue-300" />
                </div>
              </div>
              <div>
                <p className="text-white/80 text-lg">Ready to check your grammar?</p>
                <p className="text-white/60 text-sm mt-2">Click below to analyze your text using AI</p>
              </div>
              <button
                onClick={handleDetect}
                disabled={isLoading}
                className="bg-white/10 hover:bg-white/20 disabled:bg-white/5 backdrop-blur-lg border border-white/30 hover:border-white/50 disabled:border-white/20 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    Check Grammar
                  </>
                )}
              </button>
            </div>
          ) : isLoading ? (
            <div className="text-center py-16 space-y-6">
              <Loader className="w-16 h-16 animate-spin text-blue-300 mx-auto" />
              <div>
                <div className="text-white font-semibold text-lg">Analyzing your text</div>
                <p className="text-white/60 text-sm mt-2">Please wait while we check for grammar issues...</p>
              </div>
            </div>
          ) : issues.length === 0 ? (
            <div className="text-center py-16 space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                  <Check className="w-16 h-16 text-emerald-300" />
                </div>
              </div>
              <div>
                <div className="text-white font-semibold text-xl">Perfect! No issues found</div>
                <p className="text-white/60 text-sm mt-2">Your text looks great grammatically.</p>
              </div>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleDetect}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/30 hover:border-white/50 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 text-sm inline-flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Check Again
                </button>
                <button
                  onClick={onClose}
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/30 hover:border-white/50 text-white font-semibold py-2 px-6 rounded-xl transition-all duration-200 text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue, idx) => {
                const config = getSeverityConfig(issue.severity)

                return (
                  <div
                    key={idx}
                    className={`${config.bg} ${config.border} border rounded-2xl overflow-hidden transition-all duration-200 hover:border-white/40 hover:bg-white/10`}
                  >
                    {/* Issue Header */}
                    <div className="px-6 py-4 border-b border-white/10 flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        {config.icon}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`${config.badge} text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide`}>
                              {issue.severity} - {issue.type.replace(/_/g, ' ')}
                            </span>
                          </div>
                          <p className={`${config.text} font-semibold`}>{issue.message}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDismiss(idx)}
                        className="p-1.5 hover:bg-white/10 backdrop-blur-md rounded-lg transition-all ml-2 shrink-0 border border-transparent hover:border-white/20"
                      >
                        <X className="w-5 h-5 text-white/60 hover:text-white" />
                      </button>
                    </div>

                    {/* Issue Details */}
                    <div className="px-6 py-4 space-y-4">
                      {/* Wrong Sentence */}
                      {issue.original && transcript && (
                        <div>
                          <label className="text-xs font-semibold text-white/70 uppercase tracking-wide block mb-2">
                            ❌ Wrong Sentence
                          </label>
                          <div className={`${config.wrongBg} rounded-xl px-4 py-3 text-sm text-white leading-relaxed font-mono`}>
                            {transcript.substring(0, issue.position)}
                            <span className="bg-red-500/70 font-bold px-1.5 py-0.5 rounded">
                              {transcript.substring(issue.position, issue.position + issue.length)}
                            </span>
                            {transcript.substring(issue.position + issue.length)}
                          </div>
                        </div>
                      )}

                      {/* Correct Sentence with Paste Button */}
                      {issue.suggestions && issue.suggestions[0] && (
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-semibold text-white/70 uppercase tracking-wide">
                              ✓ Correct Sentence
                            </label>
                            <button
                              onClick={() => {
                                const correctedText =
                                  transcript.substring(0, issue.position) +
                                  issue.suggestions[0] +
                                  transcript.substring(issue.position + issue.length)
                                onApplyFix(correctedText)
                                const updatedIssues = issues.filter((_, i) => i !== idx)
                                setIssues(updatedIssues)
                              }}
                              className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-emerald-400/40 hover:border-emerald-300/60 text-emerald-200 hover:text-emerald-100 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 inline-flex items-center gap-1.5"
                            >
                              <ArrowRight className="w-4 h-4" />
                              Apply
                            </button>
                          </div>
                          <div className={`${config.correctBg} rounded-xl px-4 py-3 text-sm text-white leading-relaxed font-mono`}>
                            {transcript.substring(0, issue.position)}
                            <span className="bg-white/20 font-bold px-1.5 py-0.5 rounded">
                              {issue.suggestions[0]}
                            </span>
                            {transcript.substring(issue.position + issue.length)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {checkedOnce && issues.length > 0 && (
          <div className="border-t border-white/10 bg-white/5 backdrop-blur-xl px-8 py-4 flex justify-between items-center">
            <div className="text-sm text-white/80">
              <span className="font-semibold text-white">{issues.length}</span> issue{issues.length !== 1 ? 's' : ''} found
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleDetect}
                disabled={isLoading}
                className="text-white/70 hover:text-white font-semibold text-sm transition-colors duration-200 disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Check Again
              </button>
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 backdrop-blur-lg border border-white/30 hover:border-white/50 text-white px-4 py-2 rounded-xl transition-all duration-200 font-semibold text-sm"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GrammarDetector
