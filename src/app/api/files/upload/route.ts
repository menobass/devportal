import { NextRequest, NextResponse } from 'next/server'
import { getIPFSCluster } from '@/lib/ipfs-cluster'
import connectDB from '@/lib/mongodb'
import { File, User, Tier } from '@/lib/models'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    // Get auth token
    const token = request.cookies.get('auth-token')?.value
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    
    await connectDB()
    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      )
    }

    // Get form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to Uint8Array
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)

    // Check file size limits based on user tier
    const maxSize = user.tier === Tier.PREMIUM ? 500 * 1024 * 1024 : 100 * 1024 * 1024 // 500MB vs 100MB
    if (uint8Array.length > maxSize) {
      return NextResponse.json(
        { success: false, error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB` },
        { status: 400 }
      )
    }

    // Upload to IPFS cluster
    const cluster = getIPFSCluster()
    const uploadResult = await cluster.uploadFile(uint8Array, file.name)

    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error || 'Upload failed' },
        { status: 500 }
      )
    }

    // Save file record to database
    const fileRecord = new File({
      user: user._id,
      filename: file.name,
      originalName: file.name,
      mimeType: file.type,
      size: uint8Array.length,
      cid: uploadResult.cid,
      ipfsNode: uploadResult.nodeId,
      uploadedAt: new Date()
    })

    await fileRecord.save()

    return NextResponse.json({
      success: true,
      file: {
        id: fileRecord._id,
        filename: fileRecord.filename,
        size: fileRecord.size,
        cid: fileRecord.cid,
        uploadedAt: fileRecord.uploadedAt,
        ipfsNode: uploadResult.nodeId
      },
      message: `File uploaded successfully to ${uploadResult.nodeId}`
    })

  } catch (error) {
    console.error('File upload error:', error)
    
    if (error instanceof Error && error.message.includes('No available IPFS nodes')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'All storage nodes are currently full. Please try again later or contact support.',
          code: 'STORAGE_FULL'
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { success: false, error: 'Upload failed' },
      { status: 500 }
    )
  }
}