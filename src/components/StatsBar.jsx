import { formatTime, getCPM } from '../utils/formatters'

function StatsBar({ wordCount, charCount, speakingTime }) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="p-4 rounded-xl text-center backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-200 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">{wordCount}</div>
        <div className="text-xs font-semibold text-white/60 mt-1">Words</div>
      </div>
      <div className="p-4 rounded-xl text-center backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-200 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">{charCount}</div>
        <div className="text-xs font-semibold text-white/60 mt-1">Chars</div>
      </div>
      <div className="p-4 rounded-xl text-center backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-200 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">{formatTime(speakingTime)}</div>
        <div className="text-xs font-semibold text-white/60 mt-1">Time</div>
      </div>
      <div className="p-4 rounded-xl text-center backdrop-blur-md bg-white/10 border border-white/20 transition-all duration-200 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold text-white">{getCPM(charCount, speakingTime)}</div>
        <div className="text-xs font-semibold text-white/60 mt-1">CPM</div>
      </div>
    </div>
  )
}

export default StatsBar
