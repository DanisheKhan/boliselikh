import { LANGUAGES } from '../constants/languages'

function LanguageSelector({ language, onLanguageChange, isListening }) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-white/80 mb-2">
        Language
      </label>
      <div className="relative">
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          disabled={isListening}
          className="w-full px-4 py-3 bg-transparent border-2 border-white rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 appearance-none pr-12"
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
        {/* Custom dropdown arrow */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-white">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default LanguageSelector
