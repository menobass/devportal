import mongoose, { Document, Schema, Model } from 'mongoose'

// Enums
export enum Tier {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM'
}

// User Interface
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  email: string
  name?: string
  passwordHash: string
  tier: Tier
  isFirstLogin: boolean
  createdAt: Date
  updatedAt: Date
}

// User Schema
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  tier: {
    type: String,
    enum: Object.values(Tier),
    default: Tier.FREE
  },
  isFirstLogin: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  collection: 'users'
})

// API Key Interface
export interface IApiKey extends Document {
  _id: mongoose.Types.ObjectId
  name: string
  key: string
  userId: mongoose.Types.ObjectId
  isActive: boolean
  createdAt: Date
  lastUsedAt?: Date
}

// API Key Schema
const ApiKeySchema = new Schema<IApiKey>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  key: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsedAt: {
    type: Date
  }
}, {
  timestamps: true,
  collection: 'api_keys'
})

// Note: File model removed - this is now a simple API key management portal

// Note: Usage model removed for simplicity - your brother's microservice can track usage independently

// Models
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export const ApiKey: Model<IApiKey> = mongoose.models.ApiKey || mongoose.model<IApiKey>('ApiKey', ApiKeySchema)