function PlayPauseButton({ isListening, onToggle }) {
  return (
    <div className="mb-6">
      <button
        onClick={onToggle}
        className="w-full bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-lg shadow-md hover:shadow-lg transform hover:scale-105"
      >
        <span>{isListening ? '⏸️' : '▶️'}</span> {isListening ? 'Pause' : 'Play'}
      </button>
    </div>
  )
}

export default PlayPauseButton
