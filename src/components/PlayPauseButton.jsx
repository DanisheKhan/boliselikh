function PlayPauseButton({ isListening, onToggle }) {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className={`w-full font-bold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-lg transform hover:scale-105 backdrop-blur-lg border ${isListening
            ? 'bg-red-500/20 border-red-400/50 hover:bg-red-500/30 text-red-100'
            : 'bg-blue-500/20 border-blue-400/50 hover:bg-blue-500/30 text-blue-100'
          }`}
      >
        <span>{isListening ? '⏸️' : '▶️'}</span> {isListening ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

export default PlayPauseButton
