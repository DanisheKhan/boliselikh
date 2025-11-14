import { LANGUAGES } from '../constants/languages'

function LanguageSelector({ language, onLanguageChange, isListening }) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-white/80 mb-2">
        Language
      </label>
      <select
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
        disabled={isListening}
        className="w-full px-4 py-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
