import { UrlShortener } from '@/components/UrlShortener'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Shorten Your URL
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Paste your long URL below to get a shortened version
        </p>
        <UrlShortener />
      </div>
    </div>
  )
}
