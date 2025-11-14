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
            className={`w-12 h-12 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center ${fontSize === size
              ? 'bg-white text-black shadow-lg'
              : 'bg-transparent border-2 border-white text-white hover:border-white/80'
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
