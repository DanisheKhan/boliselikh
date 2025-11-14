function TranscriptDisplay({ transcript, interimTranscript, isListening, fontSize }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-semibold text-gray-900">
          Transcript
        </label>
        {isListening && (
          <div className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <span className="inline-block w-2 h-2 bg-white rounded-full animate-pulse"></span>
            Recording...
          </div>
        )}
      </div>
      <div className="relative">
        <textarea
          value={transcript + interimTranscript}
          readOnly
          className={`w-full h-64 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-gray-50 text-gray-900 font-${fontSize} resize-none`}
          placeholder="Your transcribed text will appear here..."
        />
      </div>
    </div>
  )
}

export default TranscriptDisplay
