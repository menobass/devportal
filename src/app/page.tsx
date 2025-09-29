import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          IPFS Cloud Portal
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your files on IPFS, simplified.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            href="/auth/signup" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link 
            href="/auth/login" 
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}
