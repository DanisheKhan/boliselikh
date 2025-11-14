function ErrorMessage({ error }) {
  if (!error) return null

  return (
    <div className="mb-6 bg-gray-100 border border-gray-300 text-gray-900 px-4 py-3 rounded-lg text-sm font-medium">
      ❌ {error}
    </div>
  )
}

export default ErrorMessage
