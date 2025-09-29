# MongoDB Setup Guide

## 🍃 MongoDB Options

### Option 1: MongoDB Atlas (Cloud - Recommended)
1. **Create Account**: Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. **Create Cluster**: Choose free tier (M0)
3. **Get Connection String**: 
   ```
   mongodb+srv://username:password@cluster.mongodb.net/ipfs-cloud-portal?retryWrites=true&w=majority
   ```
4. **Update `.env.local`**:
   ```env
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ipfs-cloud-portal?retryWrites=true&w=majority"
   ```

### Option 2: Local MongoDB
1. **Install MongoDB**: 
   ```bash
   # Ubuntu/Debian
   sudo apt-get install mongodb
   
   # macOS
   brew install mongodb/brew/mongodb-community
   
   # Or use Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

2. **Start MongoDB**:
   ```bash
   # Ubuntu/Debian
   sudo systemctl start mongodb
   
   # macOS
   brew services start mongodb/brew/mongodb-community
   
   # Docker
   docker start mongodb
   ```

3. **Connection String** (already in `.env.local`):
   ```env
   DATABASE_URL="mongodb://localhost:27017/ipfs-cloud-portal"
   ```

## 🚀 Initialize Database

Once MongoDB is running:

```bash
# Push schema to MongoDB
npx prisma db push

# Optional: Open Prisma Studio to view data
npx prisma studio
```

## 🔍 Why MongoDB is Great for IPFS Portal

- **Flexible Schema**: Perfect for varying file metadata
- **JSON Native**: Natural fit for IPFS hashes and metadata
- **Scalability**: Handles millions of files easily
- **Analytics**: Great for usage tracking and reporting
- **GridFS**: Can store large files if needed (backup option)

## 📊 Collection Structure

Your MongoDB will have these collections:
- `users` - User accounts
- `api_keys` - API keys for integration
- `files` - IPFS file metadata
- `usage` - Monthly usage statistics