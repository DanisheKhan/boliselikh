import { useState } from 'react'
import { detectGrammarIssuesWithGemini, rephrasTextWithGemini } from '../utils/geminiService'

function InlineGrammarDisplay({ text, onTextChange, fontSize = 'base' }) {
  const [grammarIssues, setGrammarIssues] = useState([])
  const [selectedIssueIndex, setSelectedIssueIndex] = useState(null)
  const [error, setError] = useState(null)

  const applySuggestion = (issue) => {
    if (!issue.suggestions || issue.suggestions.length === 0) {
      setError('No suggestion available for this issue')
      return
    }

    const suggestion = issue.suggestions[0]

    // Validate position data
    if (issue.position === undefined || issue.length === undefined) {
      setError('Invalid position data for this issue')
      return
    }

    // Log for debugging
    console.log('Applying suggestion:', {
      originalWord: text.substring(issue.position, issue.position + issue.length),
      suggestion,
      position: issue.position,
      length: issue.length
    })

    const before = text.substring(0, issue.position)
    const after = text.substring(issue.position + issue.length)
    const correctedText = before + suggestion + after

    console.log('Corrected text:', correctedText)

    // Update the text in the parent
    onTextChange(correctedText)

    // Clear grammar issues after applying suggestion
    setGrammarIssues([])
    setSelectedIssueIndex(null)
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
          <label className="text-sm font-semibold text-white/80">Transcript</label>
        </div>

        {/* Text Display with Inline Highlights - Now Editable */}
        <div className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden group">
          {/* Overlay for highlights - clickable */}
          <div className={`absolute inset-0 p-4 text-white/90 leading-relaxed whitespace-pre-wrap pointer-events-auto overflow-y-auto max-h-64 text-${fontSize}`}>
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
                setSelectedIssueIndex(null)
              }
            }}
            className={`relative w-full min-h-48 max-h-64 p-4 bg-white/5 resize-none focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-white/40 overflow-y-auto font-mono text-${fontSize}`}
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
    </div>
  )
}

export default InlineGrammarDisplay
