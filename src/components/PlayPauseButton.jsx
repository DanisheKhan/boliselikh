function PlayPauseButton({ isListening, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full font-bold py-4 px-8 rounded-full transition-all duration-200 flex items-center justify-center gap-2 text-lg ${isListening
        ? 'bg-white/10 border-2 border-white text-white'
        : 'bg-white text-black'
        }`}
    >
      {isListening ? 'Pause' : 'Play'}
    </button>
  )
}

export default PlayPauseButton
