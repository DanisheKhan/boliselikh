function ErrorMessage({ error }) {
  if (!error) return null

  return (
    <div className="backdrop-blur-lg bg-red-500/20 border border-red-400/50 text-red-100 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300">
      {error}
    </div>
  )
}

export default ErrorMessage
