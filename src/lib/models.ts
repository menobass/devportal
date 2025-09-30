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

// File Interface
export interface IFile extends Document {
  _id: mongoose.Types.ObjectId
  filename: string
  originalName: string
  size: number
  mimeType: string
  cid: string
  ipfsNode?: string
  user: mongoose.Types.ObjectId
  uploadedAt: Date
  createdAt: Date
  updatedAt: Date
}

// File Schema
const FileSchema = new Schema<IFile>({
  filename: {
    type: String,
    required: true,
    trim: true
  },
  originalName: {
    type: String,
    required: true,
    trim: true
  },
  size: {
    type: Number,
    required: true,
    min: 0
  },
  mimeType: {
    type: String,
    required: true
  },
  cid: {
    type: String,
    required: true,
    unique: true
  },
  ipfsNode: {
    type: String,
    trim: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  collection: 'files'
})

// Usage Interface
export interface IUsage extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  month: string // Format: YYYY-MM
  storageUsed: number // in bytes
  bandwidth: number // in bytes
  requests: number
  createdAt: Date
  updatedAt: Date
}

// Usage Schema
const UsageSchema = new Schema<IUsage>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  month: {
    type: String,
    required: true
  },
  storageUsed: {
    type: Number,
    default: 0,
    min: 0
  },
  bandwidth: {
    type: Number,
    default: 0,
    min: 0
  },
  requests: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true,
  collection: 'usage'
})

// Compound index for unique user-month combination
UsageSchema.index({ userId: 1, month: 1 }, { unique: true })

// Models
export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
export const ApiKey: Model<IApiKey> = mongoose.models.ApiKey || mongoose.model<IApiKey>('ApiKey', ApiKeySchema)
export const File: Model<IFile> = mongoose.models.File || mongoose.model<IFile>('File', FileSchema)
export const Usage: Model<IUsage> = mongoose.models.Usage || mongoose.model<IUsage>('Usage', UsageSchema)