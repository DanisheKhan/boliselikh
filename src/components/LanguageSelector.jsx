import { LANGUAGES } from '../constants/languages'

function LanguageSelector({ language, onLanguageChange, isListening }) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-gray-900 mb-2">
        Language
      </label>
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        disabled={isListening}
        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent bg-white text-gray-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector
