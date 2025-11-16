import { FONT_SIZES, FONT_SIZE_LABELS } from '../constants/languages'

function FontSizeSelector({ fontSize, onFontSizeChange }) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-white/80 mb-2">
        Text Size
      </label>
      <div className="flex gap-3 justify-center md:justify-start">
        {FONT_SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onFontSizeChange(size)}
            className={`w-12 h-12 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center backdrop-blur-lg ${fontSize === size
                ? 'bg-white/20 border border-white/40 text-white shadow-lg'
                : 'bg-white/10 border border-white/20 text-white hover:bg-white/15 hover:border-white/30'
              }`}
          >
            {FONT_SIZE_LABELS[size]}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FontSizeSelector
