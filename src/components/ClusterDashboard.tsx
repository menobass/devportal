import { useState, useEffect } from 'react'

interface ClusterNode {
  id: string
  available: boolean
  freeSpaceGB: number
  priority: number
  lastCheck: Date
}

interface ClusterStatus {
  totalNodes: number
  availableNodes: number
  totalFreeSpace: number
  nodes: ClusterNode[]
}

export default function ClusterDashboard() {
  const [cluster, setCluster] = useState<ClusterStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [newNodeEndpoint, setNewNodeEndpoint] = useState('')
  const [addingNode, setAddingNode] = useState(false)

  useEffect(() => {
    fetchClusterStatus()
    // Poll every 30 seconds
    const interval = setInterval(fetchClusterStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchClusterStatus = async () => {
    try {
      const res = await fetch('/api/admin/cluster')
      const data = await res.json()
      if (data.success) {
        setCluster(data.cluster)
      }
    } catch (error) {
      console.error('Failed to fetch cluster status:', error)
    } finally {
      setLoading(false)
    }
  }

  const addNewNode = async () => {
    if (!newNodeEndpoint.trim()) return

    setAddingNode(true)
    try {
      const res = await fetch('/api/admin/cluster', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'add-node',
          endpoint: newNodeEndpoint.trim(),
          priority: 5
        })
      })

      const data = await res.json()
      if (data.success) {
        setCluster(data.cluster)
        setNewNodeEndpoint('')
        alert('Node added successfully!')
      } else {
        alert(`Failed to add node: ${data.error}`)
      }
    } catch (error) {
      alert('Failed to add node')
    } finally {
      setAddingNode(false)
    }
  }

  if (loading) {
    return <div className="p-6">Loading cluster status...</div>
  }

  if (!cluster) {
    return <div className="p-6">Failed to load cluster status</div>
  }

  const totalFreeSpaceGB = Math.round(cluster.totalFreeSpace / (1024 * 1024 * 1024))
  
  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">IPFS Cluster Status</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{cluster.totalNodes}</div>
            <div className="text-sm text-gray-600">Total Nodes</div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{cluster.availableNodes}</div>
            <div className="text-sm text-gray-600">Available Nodes</div>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{totalFreeSpaceGB}GB</div>
            <div className="text-sm text-gray-600">Total Free Space</div>
          </div>
        </div>

        {cluster.availableNodes === 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 mr-2">⚠️</div>
              <div>
                <h3 className="font-medium text-red-800">No Available Storage Nodes!</h3>
                <p className="text-sm text-red-600">
                  All storage nodes are full or offline. Users cannot upload files until more storage is added.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <h3 className="font-medium">Node Details</h3>
          {cluster.nodes.map((node) => (
            <div
              key={node.id}
              className={`p-3 rounded-lg border ${
                node.available 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium">{node.id}</div>
                  <div className="text-sm text-gray-600">
                    Priority: {node.priority} | Free Space: {node.freeSpaceGB}GB
                  </div>
                  <div className="text-xs text-gray-500">
                    Last Check: {new Date(node.lastCheck).toLocaleTimeString()}
                  </div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  node.available 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {node.available ? 'Available' : 'Offline/Full'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Add New Storage Node</h2>
        <p className="text-gray-600 mb-4">
          When your servers start running out of space, add new IPFS nodes here. 
          Files will automatically be distributed to available nodes.
        </p>
        
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="http://your-new-server:5001"
            value={newNodeEndpoint}
            onChange={(e) => setNewNodeEndpoint(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addNewNode}
            disabled={addingNode || !newNodeEndpoint.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {addingNode ? 'Adding...' : 'Add Node'}
          </button>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p><strong>Example setup for new server:</strong></p>
          <code className="block bg-gray-100 p-2 mt-2 rounded">
            # On your new server:<br/>
            docker run -d --name ipfs-node -p 5001:5001 ipfs/kubo:latest<br/>
            # Then add: http://your-server-ip:5001
          </code>
        </div>
      </div>
    </div>
  )
}