'use client'

import { useState, useEffect } from 'react'

interface DashboardStats {
  apiKeysCount: number
  filesCount: number
  storageUsed: number
}

interface UserInfo {
  name: string
  email: string
  isFirstLogin: boolean
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    apiKeysCount: 0,
    filesCount: 0,
    storageUsed: 0
  })
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch API keys count
      const keysResponse = await fetch('/api/keys')
      if (keysResponse.ok) {
        const keysData = await keysResponse.json()
        setStats(prev => ({
          ...prev,
          apiKeysCount: keysData.keys?.length || 0
        }))
      }

      // Fetch user profile to check first login status
      const profileResponse = await fetch('/api/user/profile')
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        // Check if this is first login from localStorage (since we update DB immediately)
        const isFirstTime = localStorage.getItem('firstTimeUser') === 'true'
        setUserInfo({
          name: profileData.user.name || 'User',
          email: profileData.user.email,
          isFirstLogin: isFirstTime
        })
        // Remove the flag after showing it once
        if (isFirstTime) {
          localStorage.removeItem('firstTimeUser')
        }
      }

      // TODO: Fetch files count and storage when we implement file upload
      // For now, keep them as 0

    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatStorage = (bytes: number) => {
    if (bytes === 0) return '0 MB'
    const mb = bytes / (1024 * 1024)
    return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(1)} MB`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {userInfo?.isFirstLogin ? '🎉 Welcome to your Dashboard!' : `Welcome back${userInfo?.name ? `, ${userInfo.name}` : ''}!`}
          </h1>
          
          {userInfo?.isFirstLogin && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Account Created Successfully!
              </h2>
              <p className="text-green-700">
                Your account has been created successfully. To change any information 
                on your account, including subscription, passwords, etc. please visit your{' '}
                <a href="/dashboard/profile" className="underline font-medium">
                  profile page
                </a>.
              </p>
            </div>
          )}
          
          {!userInfo?.isFirstLogin && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700">
                Ready to upload files to IPFS? Manage your API keys and start building!
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Files</h3>
              {loading ? (
                <p className="text-2xl font-bold text-blue-600">...</p>
              ) : (
                <p className="text-2xl font-bold text-blue-600">{stats.filesCount}</p>
              )}
              <p className="text-sm text-blue-600">
                {stats.filesCount === 0 ? 'No files uploaded yet' : 'files uploaded'}
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">API Keys</h3>
              {loading ? (
                <p className="text-2xl font-bold text-purple-600">...</p>
              ) : (
                <p className="text-2xl font-bold text-purple-600">{stats.apiKeysCount}</p>
              )}
              <p className="text-sm text-purple-600">
                {stats.apiKeysCount === 0 ? 'No API keys generated' : 'active API keys'}
              </p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Storage</h3>
              {loading ? (
                <p className="text-2xl font-bold text-green-600">...</p>
              ) : (
                <p className="text-2xl font-bold text-green-600">{formatStorage(stats.storageUsed)}</p>
              )}
              <p className="text-sm text-green-600">of 1 GB used</p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">🚧 Coming Soon</h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• File upload interface</li>
              <li>• API key generation</li>
              <li>• Usage analytics</li>
              <li>• Account settings</li>
            </ul>
          </div>

          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Upload Files (Coming Soon)
            </button>
            <a 
              href="/dashboard/api-keys"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Manage API Keys
            </a>
            <a 
              href="/dashboard/profile"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              Account Profile
            </a>
            <a 
              href="/" 
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}