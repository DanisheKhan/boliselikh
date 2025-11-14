function TranscriptDisplay({ transcript, interimTranscript, isListening, fontSize }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <label className="block text-sm font-semibold text-white/80">
          Transcript
        </label>
        {isListening && (
          <div className="flex items-center gap-2 backdrop-blur-lg bg-white/10 border border-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <span className="inline-block w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Recording...
          </div>
        )}
      </div>
      <div className="relative">
        <textarea
          value={transcript + interimTranscript}
          readOnly
          className={`w-full h-64 px-4 py-3 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/40 font-${fontSize} resize-none transition-all duration-200`}
          placeholder="Your transcribed text will appear here..."
        />
      </div>
    </div>
  )
}

export default TranscriptDisplay
