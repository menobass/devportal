import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { ApiKey } from '@/lib/models'
import { verifyToken } from '@/lib/auth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    // Get JWT token from cookies
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify the token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const keyId = params.id

    // Find and delete the API key (only if it belongs to the user)
    const apiKey = await ApiKey.findOneAndDelete({
      _id: keyId,
      userId: payload.userId
    })

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      message: 'API key deleted successfully'
    })

  } catch (error) {
    console.error('API key deletion error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    
    // Get JWT token from cookies
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify the token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    const keyId = params.id
    const { isActive } = await request.json()

    // Update the API key status (only if it belongs to the user)
    const apiKey = await ApiKey.findOneAndUpdate(
      { _id: keyId, userId: payload.userId },
      { isActive },
      { new: true }
    )

    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      id: apiKey._id,
      name: apiKey.name,
      isActive: apiKey.isActive,
      message: `API key ${isActive ? 'activated' : 'deactivated'} successfully`
    })

  } catch (error) {
    console.error('API key update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}