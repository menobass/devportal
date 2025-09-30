import { NextRequest, NextResponse } from 'next/server'
import { getIPFSCluster } from '@/lib/ipfs-cluster'

export async function GET() {
  try {
    const cluster = getIPFSCluster()
    const status = cluster.getClusterStatus()
    
    return NextResponse.json({
      success: true,
      cluster: status
    })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to get cluster status' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action, endpoint, priority = 10 } = await request.json()
    const cluster = getIPFSCluster()

    if (action === 'add-node') {
      if (!endpoint) {
        return NextResponse.json(
          { success: false, error: 'Endpoint is required' },
          { status: 400 }
        )
      }

      const added = await cluster.addNewNode(endpoint, priority)
      
      if (added) {
        return NextResponse.json({
          success: true,
          message: 'Node added successfully',
          cluster: cluster.getClusterStatus()
        })
      } else {
        return NextResponse.json(
          { success: false, error: 'Failed to add node - health check failed' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action' },
      { status: 400 }
    )
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process request' },
      { status: 500 }
    )
  }
}