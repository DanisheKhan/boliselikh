function PlayPauseButton({ isListening, onToggle }) {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className={`w-full font-bold py-4 px-8 rounded-full transition-all duration-200 flex items-center justify-center gap-2 text-lg transform hover:scale-105 ${isListening
            ? 'bg-white/10 border-2 border-white text-white hover:bg-white/20'
            : 'bg-white text-black hover:bg-gray-100'
          }`}
      >
        {isListening ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

export default PlayPauseButton
