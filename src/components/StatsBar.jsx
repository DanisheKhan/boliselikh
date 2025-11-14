import { formatTime, getCPM } from '../utils/formatters'

function StatsBar({ wordCount, charCount, speakingTime }) {
  return (
    <div className="grid grid-cols-4 gap-2 mb-6">
      <div className="p-3 rounded-lg text-center bg-gray-50 border border-gray-200">
        <div className="text-2xl font-bold text-gray-900">{wordCount}</div>
        <div className="text-xs font-semibold text-gray-600">Words</div>
      </div>
      <div className="p-3 rounded-lg text-center bg-gray-50 border border-gray-200">
        <div className="text-2xl font-bold text-gray-900">{charCount}</div>
        <div className="text-xs font-semibold text-gray-600">Chars</div>
      </div>
      <div className="p-3 rounded-lg text-center bg-gray-50 border border-gray-200">
        <div className="text-2xl font-bold text-gray-900">{formatTime(speakingTime)}</div>
        <div className="text-xs font-semibold text-gray-600">Time</div>
      </div>
      <div className="p-3 rounded-lg text-center bg-gray-50 border border-gray-200">
        <div className="text-2xl font-bold text-gray-900">{getCPM(charCount, speakingTime)}</div>
        <div className="text-xs font-semibold text-gray-600">CPM</div>
      </div>
    </div>
  )
}

export default StatsBar
