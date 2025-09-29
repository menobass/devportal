import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import { ApiKey, User } from '@/lib/models'
import { verifyToken } from '@/lib/auth'
import { generateApiKey } from '@/lib/utils'

export async function POST(request: NextRequest) {
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

    const { name } = await request.json()

    if (!name || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'API key name is required' },
        { status: 400 }
      )
    }

    // Check if user exists
    const user = await User.findById(payload.userId)
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Count existing API keys (optional: limit per user)
    const existingKeys = await ApiKey.countDocuments({ 
      userId: payload.userId, 
      isActive: true 
    })

    // Limit to 10 active keys per user (you can adjust this)
    if (existingKeys >= 10) {
      return NextResponse.json(
        { error: 'Maximum number of API keys reached (10)' },
        { status: 400 }
      )
    }

    // Generate unique API key
    let apiKey
    let keyExists = true
    
    // Ensure the generated key is unique
    while (keyExists) {
      apiKey = generateApiKey()
      const existing = await ApiKey.findOne({ key: apiKey })
      keyExists = !!existing
    }

    // Create the API key
    const newApiKey = await ApiKey.create({
      name: name.trim(),
      key: apiKey,
      userId: payload.userId
    })

    return NextResponse.json({
      id: newApiKey._id,
      name: newApiKey.name,
      key: newApiKey.key,
      createdAt: newApiKey.createdAt,
      isActive: newApiKey.isActive
    })

  } catch (error) {
    console.error('API key creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
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

    // Get all API keys for the user
    const apiKeys = await ApiKey.find({ userId: payload.userId })
      .sort({ createdAt: -1 })
      .select('_id name key isActive createdAt lastUsedAt')

    return NextResponse.json({
      keys: apiKeys.map(key => ({
        id: key._id,
        name: key.name,
        key: key.key,
        isActive: key.isActive,
        createdAt: key.createdAt,
        lastUsedAt: key.lastUsedAt
      }))
    })

  } catch (error) {
    console.error('API keys fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}