function NotSupported() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md border border-gray-200">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Not Supported</h2>
        <p className="text-gray-600">
          Your browser doesn't support the Web Speech API. Please use Chrome, Edge, or Safari.
        </p>
      </div>
    </div>
  )
}

export default NotSupported
