export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export const getWordCount = (text) => {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

export const getCharCount = (text) => {
  return text.length
}

export const getCPM = (charCount, speakingTime) => {
  return charCount > 0 ? (charCount / (speakingTime || 1)).toFixed(1) : '0'
}
