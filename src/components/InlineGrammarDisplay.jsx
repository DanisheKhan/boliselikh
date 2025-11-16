import { useState } from 'react'
import { AlertCircle, RefreshCw, Copy, Check } from 'lucide-react'
import { detectGrammarIssuesWithGemini, rephrasTextWithGemini } from '../utils/geminiService'

function InlineGrammarDisplay({ text, onTextChange }) {
  const [grammarIssues, setGrammarIssues] = useState([])
  const [rephraseOption, setRephraseOption] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(null)
  const [showRephrasePanel, setShowRephrasePanel] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [error, setError] = useState(null)

  const analyzeGrammar = async (textToAnalyze = null) => {
    const textContent = textToAnalyze !== null ? textToAnalyze : text

    if (!textContent.trim()) {
      setError('Please enter some text to analyze')
      return
    }

    setIsAnalyzing(true)
    setAnalysisComplete(false)
    setError(null)
    try {
      const issues = await detectGrammarIssuesWithGemini(textContent)
      setGrammarIssues(issues || [])
      setSelectedIssueIndex(issues && issues.length > 0 ? 0 : null)
      setAnalysisComplete(true)
    } catch (err) {
      console.error('Error analyzing grammar:', err)
      setError(err.message || 'Failed to analyze grammar. Please try again.')
      setGrammarIssues([])
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getRephraseSuggestion = async (tone = 'formal') => {
    if (!text.trim()) {
      setError('Please enter some text to rephrase')
      return
    }

    setIsAnalyzing(true)
    setError(null)
    try {
      const rephrased = await rephrasTextWithGemini(text, tone)
      if (!rephrased) {
        throw new Error('No rephrase generated')
      }
      setRephraseOption({ original: text, rephrased, tone })
      setShowRephrasePanel(true)
    } catch (err) {
      console.error('Error rephrasing:', err)
      setError(err.message || 'Failed to rephrase text. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const applySuggestion = (issue) => {
    if (!issue.suggestions || issue.suggestions.length === 0) return

    const suggestion = issue.suggestions[0]
    const before = text.substring(0, issue.position)
    const after = text.substring(issue.position + issue.length)
    const correctedText = before + suggestion + after

    // Update the text in the parent
    onTextChange(correctedText)

    // Auto-reanalyze with the corrected text
    setTimeout(() => {
      analyzeGrammar(correctedText)
    }, 200)
  }

  const applyRephrase = () => {
    if (rephraseOption) {
      onTextChange(rephraseOption.rephrased)
      setShowRephrasePanel(false)
      setRephraseOption(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-xl text-sm">
          <p className="font-medium">⚠️ {error}</p>
        </div>
      )}

      {/* Main Display Box with Inline Highlights */}
      <div className="relative">
        <div className="flex justify-between items-center mb-3">
          <label className="text-sm font-semibold text-white/80">Transcript with Analysis</label>
          <div className="flex gap-2">
            <button
              onClick={() => analyzeGrammar()}
              disabled={isAnalyzing}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600/20 hover:bg-blue-600/40 border border-blue-400/50 text-blue-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
            >
              <AlertCircle className="w-3 h-3" />
              {isAnalyzing ? 'Analyzing...' : 'Analyze'}
            </button>
            <button
              onClick={() => getRephraseSuggestion('formal')}
              disabled={isAnalyzing}
              className="flex items-center gap-1 px-3 py-1 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-400/50 text-purple-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className="w-3 h-3" />
              {isAnalyzing ? 'Rephrasing...' : 'Rephrase'}
            </button>
          </div>
        </div>

        {/* Text Display with Inline Highlights - Now Editable */}
        <div className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
          {/* Overlay for highlights - clickable */}
          <div className="absolute inset-0 p-4 text-white/90 leading-relaxed whitespace-pre-wrap pointer-events-auto overflow-y-auto max-h-64">
            {text ? (
              <div
                className="cursor-text"
                onClick={(e) => {
                  // Pass click through to textarea
                  const textarea = e.currentTarget.parentElement?.nextElementSibling
                  textarea?.focus()
                }}
              >
                {grammarIssues.length === 0 ? (
                  <span className="text-transparent select-none">{text}</span>
                ) : (
                  (() => {
                    let lastIndex = 0
                    const elements = []

                    // Sort issues by position
                    const sortedIssues = [...grammarIssues].sort((a, b) => (a.position ?? 0) - (b.position ?? 0))

                    sortedIssues.forEach((issue, idx) => {
                      const pos = issue.position ?? 0
                      const len = issue.length ?? 0

                      // Skip invalid issues
                      if (pos < 0 || len <= 0) {
                        return
                      }

                      // Add text before the issue
                      if (pos > lastIndex) {
                        elements.push(
                          <span key={`text-${idx}`} className="text-transparent select-none">
                            {text.substring(lastIndex, pos)}
                          </span>
                        )
                      }

                      // Get the actual text at this position
                      const textAtPosition = text.substring(pos, pos + len)

                      // Add highlighted problematic text
                      const severityColor = {
                        high: 'bg-red-500/30 border-b-2 border-red-400 hover:bg-red-500/50',
                        medium: 'bg-yellow-500/30 border-b-2 border-yellow-400 hover:bg-yellow-500/50',
                        low: 'bg-blue-500/30 border-b-2 border-blue-400 hover:bg-blue-500/50'
                      }

                      elements.push(
                        <span
                          key={`issue-${idx}`}
                          className={`${severityColor[issue.severity] || severityColor.high} transition-all cursor-pointer select-none`}
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedIssueIndex(idx)
                          }}
                          title={issue.message}
                        >
                          {textAtPosition}
                        </span>
                      )

                      lastIndex = pos + len
                    })

                    // Add remaining text
                    if (lastIndex < text.length) {
                      elements.push(
                        <span key="text-end" className="text-transparent select-none">
                          {text.substring(lastIndex)}
                        </span>
                      )
                    }

                    return elements
                  })()
                )}
              </div>
            ) : (
              <span className="text-transparent select-none">placeholder</span>
            )}
          </div>

          {/* Editable textarea */}
          <textarea
            value={text}
            onChange={(e) => {
              onTextChange(e.target.value)
              // Clear grammar issues when user edits
              if (grammarIssues.length > 0) {
                setGrammarIssues([])
                setAnalysisComplete(false)
              }
            }}
            className="relative w-full min-h-48 max-h-64 p-4 bg-white/5 resize-none focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/40 overflow-y-auto font-mono"
            placeholder="Your text will appear here..."
          />
        </div>
      </div>

      {/* Grammar Issues Panel */}
      {grammarIssues.length > 0 && selectedIssueIndex !== null && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold uppercase text-white/60">
                  Issue {selectedIssueIndex + 1} of {grammarIssues.length}
                </span>
              </div>
              <h4 className="font-semibold text-white mb-1">
                {grammarIssues[selectedIssueIndex].message}
              </h4>
              {grammarIssues[selectedIssueIndex].original && (
                <p className="text-sm text-white/70 bg-black/30 rounded px-2 py-1 font-mono mb-2">
                  "{grammarIssues[selectedIssueIndex].original}"
                </p>
              )}
            </div>
            <div className="flex gap-1 ml-2">
              {selectedIssueIndex > 0 && (
                <button
                  onClick={() => setSelectedIssueIndex(selectedIssueIndex - 1)}
                  className="text-white/40 hover:text-white/60 text-xs"
                >
                  ←
                </button>
              )}
              {selectedIssueIndex < grammarIssues.length - 1 && (
                <button
                  onClick={() => setSelectedIssueIndex(selectedIssueIndex + 1)}
                  className="text-white/40 hover:text-white/60 text-xs"
                >
                  →
                </button>
              )}
            </div>
          </div>

          {/* Suggestions */}
          {grammarIssues[selectedIssueIndex].suggestions?.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-white/50 uppercase">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {grammarIssues[selectedIssueIndex].suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => applySuggestion(grammarIssues[selectedIssueIndex])}
                    className="bg-green-600/20 hover:bg-green-600/40 border border-green-400/50 text-green-300 px-3 py-1 rounded text-sm transition-colors font-medium"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Rephrase Panel */}
      {showRephrasePanel && rephraseOption && (
        <div className="bg-purple-500/10 border border-purple-400/30 rounded-xl p-4 space-y-3">
          <div className="flex items-start justify-between mb-2">
            <h4 className="font-semibold text-purple-200">Rephrase Suggestion</h4>
            <button
              onClick={() => setShowRephrasePanel(false)}
              className="text-white/40 hover:text-white/60"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-white/50">Tone: <span className="capitalize font-semibold text-white/70">{rephraseOption.tone}</span></p>
            <div className="bg-black/30 rounded p-3 text-white/80 text-sm">
              {rephraseOption.rephrased}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={applyRephrase}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Apply Rephrase
            </button>
            <button
              onClick={async () => {
                const newTone = rephraseOption.tone === 'formal' ? 'casual' : 'formal'
                await getRephraseSuggestion(newTone)
              }}
              className="flex-1 bg-purple-600/50 hover:bg-purple-600/70 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Try Another Tone
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      {grammarIssues.length > 0 && (
        <div className="flex gap-2 text-xs text-white/60">
          <span>Click highlighted text to view issues</span>
          <span>•</span>
          <button
            onClick={() => setGrammarIssues([])}
            className="hover:text-white/80 transition-colors"
          >
            Clear highlights
          </button>
        </div>
      )}

      {/* Success Panel - Shows when analysis is complete and no errors remain */}
      {analysisComplete && grammarIssues.length === 0 && (
        <div className="bg-green-500/10 border border-green-400/50 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-green-400" />
            <div>
              <p className="font-semibold text-green-300">Perfect! No grammar issues found</p>
              <p className="text-xs text-green-200/70">Your text is ready to use</p>
            </div>
          </div>
          <button
            onClick={() => {
              setAnalysisComplete(false)
              setGrammarIssues([])
            }}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Okay
          </button>
        </div>
      )}
    </div>
  )
}

export default InlineGrammarDisplay
