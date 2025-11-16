import { useState } from 'react'
import { X, Check, AlertCircle, Loader } from 'lucide-react'
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

  const handleApplySuggestion = (issueIndex, suggestionIndex) => {
    const issue = issues[issueIndex]
    if (issue.suggestions && issue.suggestions[suggestionIndex]) {
      const suggestion = issue.suggestions[suggestionIndex]
      onApplyFix(suggestion)

      // Remove the applied issue
      const updatedIssues = issues.filter((_, idx) => idx !== issueIndex)
      setIssues(updatedIssues)
    }
  }

  const handleDismiss = (issueIndex) => {
    const updatedIssues = issues.filter((_, idx) => idx !== issueIndex)
    setIssues(updatedIssues)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-xl font-bold text-white">Grammar Checker (AI Powered)</h2>
              <p className="text-sm text-white/60">Review and fix grammar issues</p>
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
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-xl">
              <p className="font-medium">Error: {error}</p>
              <p className="text-sm text-red-100/70 mt-1">Please check your API key configuration and try again.</p>
            </div>
          )}

          {!checkedOnce ? (
            <div className="text-center py-12 space-y-4">
              <div className="text-white/40 text-lg">Click below to analyze your text for grammar issues using AI</div>
              <button
                onClick={handleDetect}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                {isLoading ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Check Grammar'
                )}
              </button>
            </div>
          ) : isLoading ? (
            <div className="text-center py-12 space-y-4">
              <Loader className="w-12 h-12 animate-spin text-blue-400 mx-auto" />
              <div className="text-white font-semibold">Analyzing your text...</div>
              <p className="text-white/60">Please wait while we check for grammar issues</p>
            </div>
          ) : issues.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Check className="w-16 h-16 text-green-400 mx-auto" />
              <div className="text-white font-semibold text-lg">No issues found!</div>
              <p className="text-white/60">Your text looks great grammatically.</p>
              <button
                onClick={handleDetect}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-colors text-sm"
              >
                Check Again
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {issues.map((issue, idx) => {
                const severityColors = {
                  high: 'text-red-400 bg-red-500/10 border-red-400/50',
                  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-400/50',
                  low: 'text-blue-400 bg-blue-500/10 border-blue-400/50'
                }
                const colorClass = severityColors[issue.severity] || severityColors.low

                return (
                  <div key={idx} className={`border rounded-xl p-4 transition-all ${colorClass}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold uppercase tracking-wider">
                            {issue.severity} - {issue.type.replace(/_/g, ' ')}
                          </span>
                        </div>
                        <p className="text-white font-medium">{issue.message}</p>
                        {issue.original && (
                          <div className="mt-2 bg-black/30 rounded px-3 py-2 text-sm text-white/70 font-mono border-l-2 border-white/20">
                            "{issue.original}"
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleDismiss(idx)}
                        className="text-white/40 hover:text-white/60 transition-colors ml-2"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Suggestions */}
                    {issue.suggestions && issue.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-white/50 uppercase tracking-wide">Suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {issue.suggestions.map((suggestion, suggIdx) => (
                            <button
                              key={suggIdx}
                              onClick={() => handleApplySuggestion(idx, suggIdx)}
                              className="bg-green-600/20 hover:bg-green-600/40 border border-green-400/50 text-green-300 px-3 py-2 rounded-lg text-sm transition-colors font-medium"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {checkedOnce && issues.length > 0 && (
          <div className="border-t border-white/10 p-4 bg-black/20 flex justify-between items-center">
            <div className="text-sm text-white/60">
              {issues.length} issue{issues.length !== 1 ? 's' : ''} found
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDetect}
                disabled={isLoading}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                Recheck
              </button>
              <button
                onClick={onClose}
                className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
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
