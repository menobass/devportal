# Developer API Portal

A clean, focused developer portal for API key management and microservice authentication. Built with Next.js 15, TypeScript, and MongoDB.

## 🎯 Purpose

This portal provides developers with a simple way to:
- Create developer accounts
- Generate and manage API keys  
- Authenticate with your microservices
- Track basic usage (keys created, account info)

**Perfect for**: Microservice ecosystems where multiple services need unified authentication.

## ✨ Features

- **Developer Authentication**: Secure signup/login with JWT tokens
- **API Key Management**: Generate, view, and manage API keys
- **Account Dashboard**: Clean interface showing key stats and account info  
- **MongoDB Integration**: All data stored securely for microservice access
- **Responsive Design**: Works on desktop and mobile
- **TypeScript**: Full type safety throughout

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with httpOnly cookies
- **Styling**: Tailwind CSS
- **Security**: bcrypt password hashing, input validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm/yarn/pnpm

### Installation

1. **Clone and install**
   ```bash
   git clone <repository-url>
   cd ipfs-cloud-portal
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local`:
   ```env
   # MongoDB connection
   DATABASE_URL="mongodb://localhost:27017/api-portal"
   # or for Atlas: "mongodb+srv://user:pass@cluster.mongodb.net/api-portal"
   
   # JWT secret (change in production!)
   JWT_SECRET="your-super-secret-jwt-key"
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

Simple, focused data models:

### User Model
```typescript
{
  email: string          // Developer's email
  name?: string         // Optional display name  
  passwordHash: string  // bcrypt hashed password
  tier: 'FREE' | 'PREMIUM'  // Account tier
  isFirstLogin: boolean // For welcome messaging
  createdAt: Date
  updatedAt: Date
}
```

### API Key Model
```typescript
{
  name: string          // Key description/name
  key: string          // The actual API key (generated)
  userId: ObjectId     // References User
  isActive: boolean    // Can disable keys
  createdAt: Date
  lastUsedAt?: Date    // Track usage
}
```

## � Microservice Integration

Any microservice can authenticate users by querying the same MongoDB:

```javascript
// Example: Validate API key in your microservice
async function validateApiKey(apiKey) {
  const key = await ApiKey.findOne({ 
    key: apiKey, 
    isActive: true 
  }).populate('userId');
  
  if (!key) {
    return { valid: false, error: 'Invalid API key' };
  }
  
  // Update last used timestamp
  key.lastUsedAt = new Date();
  await key.save();
  
  return { 
    valid: true, 
    userId: key.userId._id,
    userEmail: key.userId.email,
    userTier: key.userId.tier
  };
}
```

## 🛠️ Project Structure

```
src/
├── app/
│   ├── auth/                 # Login/signup pages
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/            # Protected dashboard
│   │   ├── page.tsx         # Main dashboard
│   │   ├── api-keys/        # API key management
│   │   └── profile/         # Account settings
│   └── api/                  # API endpoints
│       ├── auth/            # Authentication APIs
│       ├── keys/            # API key management
│       └── user/            # User profile APIs
├── lib/
│   ├── mongodb.ts           # Database connection
│   ├── models.ts            # Mongoose schemas
│   ├── auth.ts              # JWT utilities
│   └── utils.ts             # Helper functions
└── components/              # Reusable UI components
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth with httpOnly cookies
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: All inputs sanitized and validated
- **MongoDB Injection Protection**: Mongoose schema validation
- **Environment Variables**: Sensitive data in env vars only

## 🚀 Deployment

### Environment Setup
```env
# Production environment variables
DATABASE_URL="mongodb+srv://user:pass@cluster.mongodb.net/api-portal"
JWT_SECRET="your-production-jwt-secret-make-it-long-and-random"
```

### Build and Deploy
```bash
npm run build
npm start
```

### Recommended Hosting
- **Frontend**: Vercel, Netlify, Railway
- **Database**: MongoDB Atlas (free tier available)

## � Customization

Easy to customize for your brand:

1. **Update branding** in `src/app/page.tsx`
2. **Modify colors** in `tailwind.config.js`  
3. **Add features** by extending the database models
4. **Integration docs** - add your API documentation links

## 📝 API Endpoints

Core endpoints for the portal:

- `POST /api/auth/signup` - Create developer account
- `POST /api/auth/login` - Authenticate developer  
- `GET /api/keys` - List user's API keys
- `POST /api/keys` - Generate new API key
- `DELETE /api/keys/[id]` - Delete API key
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

## 🤝 Perfect For

- **Microservice Authentication**: Centralized API key management
- **Developer Onboarding**: Clean signup flow for your services
- **Multi-Service Architecture**: One portal for all your APIs
- **Rapid Prototyping**: Get authentication working quickly

## 📄 License

MIT License - build whatever you want with this!

---

