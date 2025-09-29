'use client'

import { useState, useEffect } from 'react'
import { KeyIcon, TrashIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface ApiKey {
  id: string
  name: string
  key: string
  isActive: boolean
  createdAt: string
  lastUsedAt?: string
}

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [error, setError] = useState('')

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/keys')
      if (response.ok) {
        const data = await response.json()
        setApiKeys(data.keys)
      } else {
        setError('Failed to fetch API keys')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const createApiKey = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKeyName.trim()) return

    setCreating(true)
    setError('')

    try {
      const response = await fetch('/api/keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newKeyName.trim() })
      })

      if (response.ok) {
        const newKey = await response.json()
        setApiKeys(prev => [newKey, ...prev])
        setNewKeyName('')
        setShowCreateForm(false)
        // Show the new key by default
        setVisibleKeys(prev => new Set([...prev, newKey.id]))
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to create API key')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setCreating(false)
    }
  }

  const deleteApiKey = async (id: string) => {
    if (!confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setApiKeys(prev => prev.filter(key => key.id !== id))
        setVisibleKeys(prev => {
          const newSet = new Set(prev)
          newSet.delete(id)
          return newSet
        })
      } else {
        setError('Failed to delete API key')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  const toggleKeyVisibility = (id: string) => {
    setVisibleKeys(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const toggleKeyStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/keys/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentStatus })
      })

      if (response.ok) {
        setApiKeys(prev => prev.map(key => 
          key.id === id ? { ...key, isActive: !currentStatus } : key
        ))
      } else {
        setError('Failed to update API key status')
      }
    } catch (err) {
      setError('Network error')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading API Keys...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="bg-white rounded-lg shadow">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                  <KeyIcon className="h-6 w-6 mr-2" />
                  API Keys
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your API keys for accessing IPFS services
                </p>
              </div>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Create New Key
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Create Form */}
          {showCreateForm && (
            <div className="px-6 py-4 bg-gray-50 border-b">
              <form onSubmit={createApiKey}>
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Enter API key name (e.g., Production API)"
                    value={newKeyName}
                    onChange={(e) => setNewKeyName(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={creating}
                  />
                  <button
                    type="submit"
                    disabled={creating || !newKeyName.trim()}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                  >
                    {creating ? 'Creating...' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false)
                      setNewKeyName('')
                      setError('')
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* API Keys List */}
          <div className="p-6">
            {apiKeys.length === 0 ? (
              <div className="text-center py-12">
                <KeyIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No API Keys</h3>
                <p className="text-gray-600 mb-4">Create your first API key to get started</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  Create API Key
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((key) => (
                  <div key={key.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-gray-900">{key.name}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            key.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {key.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-2">
                          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                            {visibleKeys.has(key.id) ? key.key : '••••••••••••••••••••••••••••••••'}
                          </code>
                          <button
                            onClick={() => toggleKeyVisibility(key.id)}
                            className="text-gray-500 hover:text-gray-700"
                            title={visibleKeys.has(key.id) ? 'Hide key' : 'Show key'}
                          >
                            {visibleKeys.has(key.id) ? (
                              <EyeSlashIcon className="h-4 w-4" />
                            ) : (
                              <EyeIcon className="h-4 w-4" />
                            )}
                          </button>
                          {visibleKeys.has(key.id) && (
                            <button
                              onClick={() => copyToClipboard(key.key)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Copy
                            </button>
                          )}
                        </div>
                        
                        <div className="text-sm text-gray-500">
                          Created: {new Date(key.createdAt).toLocaleDateString()}
                          {key.lastUsedAt && (
                            <span className="ml-4">
                              Last used: {new Date(key.lastUsedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => toggleKeyStatus(key.id, key.isActive)}
                          className={`px-3 py-1 text-sm rounded ${
                            key.isActive
                              ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                              : 'bg-green-100 text-green-800 hover:bg-green-200'
                          }`}
                        >
                          {key.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => deleteApiKey(key.id)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete API key"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Back to Dashboard */}
          <div className="px-6 py-4 border-t border-gray-200">
            <a
              href="/dashboard"
              className="inline-block bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}