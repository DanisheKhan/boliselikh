export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    return false
  }
}

export const downloadAsText = (transcript) => {
  if (!transcript) return

  const element = document.createElement('a')
  const file = new Blob([transcript], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = `transcript_${new Date().toISOString().split('T')[0]}.txt`
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}

export const downloadAsJSON = (transcript, wordCount, charCount, language, speakingTime) => {
  if (!transcript) return

  const data = {
    timestamp: new Date().toISOString(),
    text: transcript,
    wordCount,
    charCount,
    language,
    speakingTime
  }

  const element = document.createElement('a')
  const file = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
  element.href = URL.createObjectURL(file)
  element.download = `transcript_${new Date().toISOString().split('T')[0]}.json`
  document.body.appendChild(element)
  element.click()
  document.body.removeChild(element)
}
