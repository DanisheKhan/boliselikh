import { FONT_SIZES, FONT_SIZE_LABELS } from '../constants/languages'

function FontSizeSelector({ fontSize, onFontSizeChange }) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        Text Size
      </label>
      <div className="flex gap-2">
        {FONT_SIZES.map((size) => (
          <button
            key={size}
            onClick={() => onFontSizeChange(size)}
            className={`flex-1 px-3 py-2 rounded-lg font-semibold transition-all ${fontSize === size
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
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
