import { FONT_SIZES, FONT_SIZE_LABELS } from '../constants/languages'

function FontSizeSelector({ fontSize, onFontSizeChange }) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-white/80 mb-2">
        Text Size
      </label>
      <div className="flex gap-2">
        {FONT_SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onFontSizeChange(size)}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all ${fontSize === size
              ? 'backdrop-blur-md bg-white/20 border border-white/40 text-white'
              : 'backdrop-blur-md bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
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
