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

IMPORTANT: You MUST provide startChar and endChar for EVERY issue. These are critical for highlighting.

For each issue found, include:
- type: the type (e.g., "spelling", "grammar", "punctuation", "word_choice")
- message: brief explanation
- problematicText: the EXACT problematic words/text from the original (must match exactly)
- suggestions: array with 1-3 suggested corrections
- severity: either "high", "medium", or "low"
- startChar: the EXACT 0-indexed character position where the issue starts (count from beginning)
- endChar: the EXACT 0-indexed character position where the issue ends (exclusive, so endChar - startChar = word length)

TEXT TO ANALYZE:
"${text}"

Character position reference:
${Array.from(text).map((_, i) => i % 10).join('')}

Return ONLY a valid JSON array. If no issues found, return [].

Example for text "this is test":
If "is" at positions 5-7 was wrong, you'd use: startChar: 5, endChar: 7
If "test" at positions 8-12 was wrong, you'd use: startChar: 8, endChar: 12

Example format: [{"type":"grammar","message":"Subject-verb agreement error: 'I' requires 'am', not 'are'.","problematicText":"are","suggestions":["am"],"severity":"high","startChar":15,"endChar":18}]

CRITICAL: Always verify that text.substring(startChar, endChar) equals problematicText.`

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

    // Convert to position and length using Gemini's provided positions
    issues = issues.map((issue) => {
      // Prefer Gemini's position data if available
      if (issue.startChar !== undefined && issue.endChar !== undefined) {
        return {
          ...issue,
          position: issue.startChar,
          length: issue.endChar - issue.startChar,
          original: issue.problematicText
        }
      }

      // Fallback: search for the text
      if (issue.problematicText) {
        const position = text.indexOf(issue.problematicText)
        if (position !== -1) {
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
