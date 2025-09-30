'use client'

import { useState, useEffect } from 'react'

interface DashboardStats {
  apiKeysCount: number
}

interface UserInfo {
  name: string
  email: string
  tier: string
  isFirstLogin: boolean
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    apiKeysCount: 0
  })
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch API keys count
      const keysResponse = await fetch('/api/keys')
      if (keysResponse.ok) {
        const keysData = await keysResponse.json()
        setStats({
          apiKeysCount: keysData.keys?.length || 0
        })
      }

      // Fetch user profile to check first login status
      const profileResponse = await fetch('/api/user/profile')
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        // Check if this is first login from localStorage (only on client side)
        const isFirstTime = mounted && typeof window !== 'undefined' 
          ? localStorage.getItem('firstTimeUser') === 'true' 
          : false
        setUserInfo({
          name: profileData.user.name || 'User',
          email: profileData.user.email,
          tier: profileData.user.tier || 'FREE',
          isFirstLogin: isFirstTime
        })
        // Remove the flag after showing it once
        if (isFirstTime && typeof window !== 'undefined') {
          localStorage.removeItem('firstTimeUser')
        }
      }

    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Dashboard fetch error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Prevent hydration mismatch by not rendering dynamic content until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {userInfo?.isFirstLogin ? '🎉 Welcome to your Developer Portal!' : `Welcome back${userInfo?.name ? `, ${userInfo.name}` : ''}!`}
          </h1>
          
          {userInfo?.isFirstLogin && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Developer Account Created Successfully!
              </h2>
              <p className="text-green-700">
                Your developer account is ready! Generate API keys to start integrating with our services.
                You can manage your account settings on your{' '}
                <a href="/dashboard/profile" className="underline font-medium">
                  profile page
                </a>.
              </p>
            </div>
          )}
          
          {!userInfo?.isFirstLogin && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-700">
                Manage your API keys and integrate with our services. Your keys authenticate your applications.
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* API Keys Stats */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-900 mb-2">API Keys</h3>
              {loading ? (
                <p className="text-2xl font-bold text-purple-600">...</p>
              ) : (
                <p className="text-2xl font-bold text-purple-600">{stats.apiKeysCount}</p>
              )}
              <p className="text-sm text-purple-600">
                {stats.apiKeysCount === 0 ? 'No API keys generated yet' : 'active API keys'}
              </p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Account Tier</h3>
              <p className="text-2xl font-bold text-blue-600">
                {userInfo?.tier || 'FREE'}
              </p>
              <p className="text-sm text-blue-600">
                {userInfo?.tier === 'PREMIUM' ? 'Premium developer account' : 'Free developer account'}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <a 
                href="/dashboard/api-keys"
                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2h-3m-3 7h3m-3 0a2 2 0 01-2-2m0 0a2 2 0 01-2-2m2 2v3"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Manage API Keys</h4>
                  <p className="text-sm text-gray-600">Create, view, and manage your API keys</p>
                </div>
              </a>

              <a 
                href="/dashboard/profile"
                className="flex items-center p-4 bg-white rounded-lg border border-gray-200 hover:border-purple-300 hover:shadow-sm transition-all"
              >
                <div className="bg-purple-100 p-3 rounded-lg mr-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Account Settings</h4>
                  <p className="text-sm text-gray-600">Update profile and account settings</p>
                </div>
              </a>
            </div>
          </div>

          {/* API Documentation */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">🚀 Ready to Integrate?</h3>
            <p className="text-gray-700 mb-4">
              Your API keys will authenticate requests to our microservices. Each key is stored securely 
              and can be used across all our services.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a 
                href="/dashboard/api-keys"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Generate First API Key
              </a>
              <a 
                href="#" 
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                View Documentation
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}