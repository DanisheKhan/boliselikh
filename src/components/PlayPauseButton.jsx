function PlayPauseButton({ isListening, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full font-semibold py-3 px-4 rounded-full transition-all duration-200 flex items-center justify-center gap-2 text-sm ${isListening
        ? 'bg-transparent border-2 border-white text-white disabled:border-white/30 disabled:text-white/40'
        : 'bg-white text-black disabled:bg-white/40'
        } disabled:cursor-not-allowed`}
    >
      {isListening ? 'Pause' : 'Play'}
    </button>
  )
}

export default PlayPauseButton
