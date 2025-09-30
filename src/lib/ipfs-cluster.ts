import { createHelia } from 'helia'
import { unixfs } from '@helia/unixfs'

interface IPFSNode {
  id: string
  endpoint: string
  available: boolean
  freeSpace: number // in bytes
  priority: number // 1 = highest priority
  lastHealthCheck: Date
}

interface UploadResult {
  cid: string
  nodeId: string
  size: number
  success: boolean
  error?: string
}

class IPFSClusterManager {
  private nodes: IPFSNode[] = []
  private healthCheckInterval: NodeJS.Timeout | null = null

  constructor() {
    this.initializeNodes()
    this.startHealthChecks()
  }

  private initializeNodes() {
    // Load from environment variables or database
    const nodeConfigs = [
      {
        id: 'primary',
        endpoint: process.env.IPFS_PRIMARY_ENDPOINT || 'http://localhost:5001',
        priority: 1
      },
      {
        id: 'secondary',
        endpoint: process.env.IPFS_SECONDARY_ENDPOINT || '',
        priority: 2
      },
      {
        id: 'tertiary',
        endpoint: process.env.IPFS_TERTIARY_ENDPOINT || '',
        priority: 3
      }
    ].filter(config => config.endpoint) // Only include nodes with endpoints

    this.nodes = nodeConfigs.map(config => ({
      ...config,
      available: false,
      freeSpace: 0,
      lastHealthCheck: new Date()
    }))
  }

  private async checkNodeHealth(node: IPFSNode): Promise<boolean> {
    try {
      // Check if node is responding and has space
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000)

      const response = await fetch(`${node.endpoint}/api/v0/stats/repo`, {
        method: 'POST',
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const stats = await response.json()
        node.freeSpace = stats.RepoSize ? (stats.StorageMax - stats.RepoSize) : 0
        node.available = node.freeSpace > 100 * 1024 * 1024 // At least 100MB free
        node.lastHealthCheck = new Date()
        return node.available
      }
    } catch (error) {
      console.error(`Health check failed for node ${node.id}:`, error)
    }
    
    node.available = false
    return false
  }

  private startHealthChecks() {
    // Check node health every 30 seconds
    this.healthCheckInterval = setInterval(async () => {
      await Promise.all(
        this.nodes.map(node => this.checkNodeHealth(node))
      )
    }, 30000)

    // Initial health check
    this.nodes.forEach(node => this.checkNodeHealth(node))
  }

  private getAvailableNodes(): IPFSNode[] {
    return this.nodes
      .filter(node => node.available)
      .sort((a, b) => {
        // Sort by priority first, then by available space
        if (a.priority !== b.priority) {
          return a.priority - b.priority
        }
        return b.freeSpace - a.freeSpace
      })
  }

  public async uploadFile(file: Uint8Array, fileName: string): Promise<UploadResult> {
    const availableNodes = this.getAvailableNodes()
    
    if (availableNodes.length === 0) {
      throw new Error('No available IPFS nodes for upload')
    }

    // Try uploading to nodes in priority order
    for (const node of availableNodes) {
      try {
        const result = await this.uploadToNode(node, file, fileName)
        if (result.success) {
          // Optionally replicate to backup nodes
          this.replicateToBackupNodes(result.cid, availableNodes.slice(1, 3))
          return result
        }
      } catch (error) {
        console.warn(`Upload failed on node ${node.id}:`, error)
        // Mark node as temporarily unavailable
        node.available = false
        continue
      }
    }

    throw new Error('Upload failed on all available nodes')
  }

  private async uploadToNode(node: IPFSNode, file: Uint8Array, fileName: string): Promise<UploadResult> {
    try {
      // Create form data for IPFS API
      const formData = new FormData()
      const buffer = new ArrayBuffer(file.length)
      const view = new Uint8Array(buffer)
      view.set(file)
      const fileBlob = new Blob([buffer], { type: 'application/octet-stream' })
      formData.append('file', fileBlob, fileName)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 60000) // 1 minute timeout

      const response = await fetch(`${node.endpoint}/api/v0/add`, {
        method: 'POST',
        body: formData,
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`)
      }

      const result = await response.json()
      
      return {
        cid: result.Hash,
        nodeId: node.id,
        size: result.Size,
        success: true
      }
    } catch (error) {
      return {
        cid: '',
        nodeId: node.id,
        size: 0,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    }
  }

  private async replicateToBackupNodes(cid: string, backupNodes: IPFSNode[]) {
    // Asynchronously replicate to backup nodes
    backupNodes.forEach(async (node) => {
      try {
        await fetch(`${node.endpoint}/api/v0/pin/add?arg=${cid}`, {
          method: 'POST'
        })
      } catch (error) {
        console.warn(`Replication to ${node.id} failed:`, error)
      }
    })
  }

  public async addNewNode(endpoint: string, priority: number = 10): Promise<boolean> {
    const newNode: IPFSNode = {
      id: `node-${Date.now()}`,
      endpoint,
      available: false,
      freeSpace: 0,
      priority,
      lastHealthCheck: new Date()
    }

    // Test the new node
    const isHealthy = await this.checkNodeHealth(newNode)
    
    if (isHealthy) {
      this.nodes.push(newNode)
      console.log(`Successfully added new IPFS node: ${newNode.id}`)
      return true
    }

    return false
  }

  public getClusterStatus() {
    return {
      totalNodes: this.nodes.length,
      availableNodes: this.nodes.filter(n => n.available).length,
      totalFreeSpace: this.nodes.reduce((sum, n) => sum + n.freeSpace, 0),
      nodes: this.nodes.map(n => ({
        id: n.id,
        available: n.available,
        freeSpaceGB: Math.round(n.freeSpace / (1024 * 1024 * 1024)),
        priority: n.priority,
        lastCheck: n.lastHealthCheck
      }))
    }
  }

  public destroy() {
    if (this.healthCheckInterval) {
      clearInterval(this.healthCheckInterval)
    }
  }
}

// Singleton instance
let clusterManager: IPFSClusterManager | null = null

export function getIPFSCluster(): IPFSClusterManager {
  if (!clusterManager) {
    clusterManager = new IPFSClusterManager()
  }
  return clusterManager
}

export { IPFSClusterManager }
export type { IPFSNode, UploadResult }