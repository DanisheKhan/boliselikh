import { GoogleGenerativeAI } from '@google/generative-ai'

// Vite automatically exposes env variables that start with VITE_
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

if (!API_KEY) {
  console.warn('VITE_GEMINI_API_KEY is not set in environment variables. Please check your .env file.')
  console.warn('Available env vars:', Object.keys(import.meta.env).filter(k => k.includes('GEMINI') || k.includes('API')))
}

let genAI = null

const initializeGenAI = () => {
  if (!genAI && API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY)
  }
  return genAI
}

export const detectGrammarIssuesWithGemini = async (text) => {
  if (!API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
  }

  try {
    const ai = initializeGenAI()
    if (!ai) {
      throw new Error('Failed to initialize Gemini AI')
    }

    // Use gemini-2.0-flash which is the latest stable model
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `Analyze the following text for grammar issues. Return a JSON array of issues found. Each issue should have:
- type: the type of grammar issue
- message: a clear explanation
- position: character position in text (approximate)
- length: length of the problematic text
- suggestions: array of suggested corrections
- severity: 'high', 'medium', or 'low'
- original: the original problematic text

Text to analyze:
"${text}"

Return ONLY valid JSON array, no markdown or extra text. If no issues, return [].`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text()

    // Extract JSON from response
    const jsonMatch = responseText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      console.error('Could not parse Gemini response:', responseText)
      return []
    }

    const issues = JSON.parse(jsonMatch[0])
    return Array.isArray(issues) ? issues : []
  } catch (error) {
    console.error('Error detecting grammar with Gemini:', error)
    throw error
  }
}

export const rephrasTextWithGemini = async (text, tone) => {
  if (!API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
  }

  try {
    const ai = initializeGenAI()
    if (!ai) {
      throw new Error('Failed to initialize Gemini AI')
    }

    // Use gemini-2.0-flash which is the latest stable model
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const toneDescriptions = {
      formal: 'professional and formal tone suitable for business communication',
      casual: 'relaxed and informal tone suitable for friendly conversation',
      concise: 'shortened and direct tone, removing unnecessary words',
      simple: 'easy-to-understand tone using simpler vocabulary'
    }

    const prompt = `Rephrase the following text in a ${toneDescriptions[tone]} manner. Return ONLY the rephrased text, nothing else.

Text to rephrase:
"${text}"`

    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error(`Error rephrasing text with tone '${tone}':`, error)
    throw error
  }
}

export const generateAllRephrasingsWithGemini = async (text) => {
  if (!API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
  }

  try {
    const tones = ['formal', 'casual', 'concise', 'simple']
    const rephrasings = {}

    // Generate all rephrasings in parallel for better performance
    const results = await Promise.all(
      tones.map(tone => rephrasTextWithGemini(text, tone))
    )

    tones.forEach((tone, index) => {
      rephrasings[tone] = results[index]
    })

    return rephrasings
  } catch (error) {
    console.error('Error generating rephrasings with Gemini:', error)
    throw error
  }
}

export const improveGrammarWithGemini = async (text) => {
  if (!API_KEY) {
    throw new Error('Gemini API key not configured. Please add VITE_GEMINI_API_KEY to your .env file.')
  }

  try {
    const ai = initializeGenAI()
    if (!ai) {
      throw new Error('Failed to initialize Gemini AI')
    }

    // Use gemini-2.0-flash which is the latest stable model
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const prompt = `Improve the grammar and clarity of the following text while preserving its original meaning. Return ONLY the improved text, nothing else.

Text to improve:
"${text}"`

    const result = await model.generateContent(prompt)
    return result.response.text().trim()
  } catch (error) {
    console.error('Error improving grammar with Gemini:', error)
    throw error
  }
}
