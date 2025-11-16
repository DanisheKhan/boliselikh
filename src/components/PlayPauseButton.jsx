function PlayPauseButton({ isListening, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 text-sm backdrop-blur-lg ${isListening
          ? 'bg-white/10 border border-white/20 text-white disabled:border-white/10 disabled:text-white/30'
          : 'bg-white/20 border border-white/40 text-white disabled:bg-white/10 disabled:border-white/20 disabled:text-white/30'
        } disabled:cursor-not-allowed`}
    >
      {isListening ? 'Pause' : 'Play'}
    </button>
  )
}

export default PlayPauseButton
