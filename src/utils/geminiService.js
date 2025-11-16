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

    const prompt = `You are a professional grammar checker. Analyze the following text and return a JSON array of grammar issues.

For each issue found, include:
- type: the type (e.g., "spelling", "grammar", "punctuation", "word_choice")
- message: brief explanation
- problematicText: the EXACT problematic words/text from the original
- suggestions: array with 1-3 suggested corrections
- severity: either "high", "medium", or "low"

TEXT TO ANALYZE:
${text}

Return ONLY a valid JSON array. If no issues found, return [].
Example format: [{"type":"grammar","message":"Subject-verb agreement error: 'I' requires 'am', not 'are'.","problematicText":"are","suggestions":["am"],"severity":"high"}]

IMPORTANT: Always include the exact problematic text that appears in the original text. Match it exactly.`

    const result = await model.generateContent(prompt)
    const responseText = result.response.text().trim()

    // Extract JSON from response - handle various formats
    let jsonStr = responseText

    // Remove markdown code blocks if present
    if (responseText.includes('```json')) {
      jsonStr = responseText.replace(/```json\n?/g, '').replace(/```/g, '').trim()
    } else if (responseText.includes('```')) {
      jsonStr = responseText.replace(/```\n?/g, '').trim()
    }

    // Parse JSON
    let issues = JSON.parse(jsonStr)
    if (!Array.isArray(issues)) {
      issues = []
    }

    // Convert problematicText to position and length with better position detection
    let lastFoundPosition = 0
    issues = issues.map((issue, idx) => {
      if (issue.problematicText) {
        // Search for the problematic text starting from after the last found issue
        let position = text.indexOf(issue.problematicText, lastFoundPosition)

        if (position !== -1) {
          lastFoundPosition = position + issue.problematicText.length
          return {
            ...issue,
            position,
            length: issue.problematicText.length,
            original: issue.problematicText
          }
        }
      }
      return issue
    }).filter(issue => issue.position !== undefined && issue.position !== -1)

    return issues
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
      formal: 'professional, business-appropriate, and formal',
      casual: 'friendly, relaxed, and conversational',
      concise: 'short, direct, and removes unnecessary words',
      simple: 'easy to understand with simple vocabulary'
    }

    const prompt = `You must rephrase the following text to be ${toneDescriptions[tone]}. 

Original text: "${text}"

Rules:
- Keep the same meaning and information
- Change only the style, tone, and word choice
- Do not add or remove information
- Return ONLY the rephrased text with no quotes, no explanation, no markdown

Rephrased text:`

    const result = await model.generateContent(prompt)
    const rephrased = result.response.text().trim()

    // Clean up any quotes or extra formatting
    return rephrased.replace(/^["']|["']$/g, '').trim()
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
