'use client'
import { useState } from 'react'

export function UrlShortener() {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (response.ok) {
        setShortUrl(data.shortUrl)
        setUrl('')
      } else {
        alert(data.error || 'Something went wrong')
      }
    } catch (error) {
      alert('Network error - please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-800">
            Your short URL: {' '}
            <a 
              href={shortUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-medium"
            >
              {shortUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  )
}
