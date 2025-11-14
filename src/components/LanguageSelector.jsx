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
        className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        style={{
          colorScheme: 'dark',
        }}
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default LanguageSelector
