# IPFS Cloud Portal# IPFS Cloud PortalThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



A modern developer portal for managing IPFS (InterPlanetary File System) services, similar to Pinata.cloud. This platform provides users with the ability to upload, manage, and distribute files on IPFS with a developer-friendly interface.



## ✨ FeaturesA modern developer portal for managing IPFS (InterPlanetary File System) services, similar to Pinata.cloud. This platform provides users with the ability to upload, manage, and distribute files on IPFS with a developer-friendly interface.## Getting Started



- **User Authentication**: Email-based signup and login system

- **Account Management**: User dashboard with account settings

- **API Key Management**: Generate and manage API keys for integration## ✨ FeaturesFirst, run the development server:

- **File Upload & Management**: Intuitive interface for IPFS file operations

- **Subscription Tiers**: Free and premium plans with usage limits

- **Usage Analytics**: Track storage, bandwidth, and API requests

- **Modern UI**: Responsive design with Tailwind CSS- **User Authentication**: Email-based signup and login system```bash

- **Developer-Friendly**: RESTful API for seamless integration

- **Account Management**: User dashboard with account settingsnpm run dev

## 🏗️ Tech Stack

- **API Key Management**: Generate and manage API keys for integration# or

- **Framework**: Next.js 15+ with App Router

- **Language**: TypeScript- **File Upload & Management**: Intuitive interface for IPFS file operationsyarn dev

- **Styling**: Tailwind CSS

- **Database**: MongoDB with Mongoose ODM- **Subscription Tiers**: Free and premium plans with usage limits# or

- **Authentication**: JWT-based auth system

- **IPFS**: Helia (modern IPFS client)- **Usage Analytics**: Track storage, bandwidth, and API requestspnpm dev

- **UI Components**: Headless UI, Heroicons

- **Modern UI**: Responsive design with Tailwind CSS# or

## 🚀 Getting Started

- **Developer-Friendly**: RESTful API for seamless integrationbun dev

### Prerequisites

```

- Node.js 18+ and npm

- MongoDB (local or Atlas)## 🏗️ Tech Stack

- Git

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Installation

- **Framework**: Next.js 15+ with App Router

1. **Clone the repository**

   ```bash- **Language**: TypeScriptYou can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

   git clone <repository-url>

   cd ipfs-cloud-portal- **Styling**: Tailwind CSS

   ```

- **Database**: SQLite with Prisma ORMThis project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

2. **Install dependencies**

   ```bash- **Authentication**: JWT-based auth system

   npm install

   ```- **IPFS**: Helia (modern IPFS client)## Learn More



3. **Set up MongoDB**- **UI Components**: Headless UI, Heroicons

   - **Option 1**: MongoDB Atlas (recommended)

     - Create account at [MongoDB Atlas](https://cloud.mongodb.com)To learn more about Next.js, take a look at the following resources:

     - Create a free cluster

     - Get your connection string## 🚀 Getting Started

   

   - **Option 2**: Local MongoDB- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

     ```bash

     # Install MongoDB locally or use Docker### Prerequisites- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

     docker run -d -p 27017:27017 --name mongodb mongo:latest

     ```



4. **Set up environment variables**- Node.js 18+ and npmYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

   Edit `.env.local` and update your MongoDB connection:

   ```env- Git

   # For MongoDB Atlas

   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ipfs-cloud-portal?retryWrites=true&w=majority"## Deploy on Vercel

   

   # For local MongoDB### Installation

   DATABASE_URL="mongodb://localhost:27017/ipfs-cloud-portal"

   The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

   JWT_SECRET="your-super-secret-jwt-key-change-in-production"

   ```1. **Clone the repository**



5. **Start the development server**   ```bashCheck out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

   ```bash

   npm run dev   git clone <repository-url>

   ```   cd ipfs-cloud-portal

   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)2. **Install dependencies**

   ```bash

## 📊 Subscription Tiers   npm install

   ```

### Free Tier

- 1 GB Storage3. **Set up environment variables**

- 10 GB Bandwidth/month   ```bash

- 1,000 API Requests/month   cp .env.local.example .env.local

- Community Support   ```

   Edit `.env.local` and update the JWT secret:

### Premium Tier ($20/month)   ```env

- 100 GB Storage   DATABASE_URL="file:./dev.db"

- 1 TB Bandwidth/month   JWT_SECRET="your-super-secret-jwt-key-change-in-production"

- Unlimited API Requests   ```

- Priority Support

4. **Initialize the database**

## 🛠️ Development   ```bash

   npx prisma generate

### Project Structure   npx prisma db push

   ```

```

src/5. **Start the development server**

├── app/                    # Next.js App Router pages   ```bash

│   ├── auth/              # Authentication pages   npm run dev

│   ├── dashboard/         # User dashboard   ```

│   └── api/               # API routes

├── lib/6. **Open your browser**

│   ├── mongodb.ts         # MongoDB connection   Navigate to [http://localhost:3000](http://localhost:3000)

│   ├── models.ts          # Mongoose models

│   ├── auth.ts           # Authentication utilities## 📊 Subscription Tiers

│   ├── ipfs.ts           # IPFS integration

│   └── utils.ts          # General utilities### Free Tier

└── components/           # Reusable UI components- 1 GB Storage

```- 10 GB Bandwidth/month

- 1,000 API Requests/month

### Available Scripts- Community Support



- `npm run dev` - Start development server with Turbopack### Premium Tier ($20/month)

- `npm run build` - Build for production- 100 GB Storage

- `npm run start` - Start production server- 1 TB Bandwidth/month

- `npm run lint` - Run ESLint- Unlimited API Requests

- Priority Support

### Database Models

## 🛠️ Development

The application uses Mongoose with MongoDB. Key models include:

### Project Structure

- **User**: User accounts with authentication

- **ApiKey**: API keys for external integration```

- **File**: IPFS file metadatasrc/

- **Usage**: Monthly usage tracking├── app/                    # Next.js App Router pages

│   ├── auth/              # Authentication pages

### Example Mongoose Usage│   ├── dashboard/         # User dashboard

│   └── api/               # API routes

```typescript├── lib/                   # Utility libraries

import { User, File } from '@/lib/models'│   ├── auth.ts           # Authentication utilities

import connectDB from '@/lib/mongodb'│   ├── ipfs.ts           # IPFS integration

│   ├── prisma.ts         # Database client

// Create a user│   └── utils.ts          # General utilities

await connectDB()└── components/           # Reusable UI components

const user = await User.create({```

  email: 'user@example.com',

  name: 'John Doe',### Available Scripts

  passwordHash: hashedPassword

})- `npm run dev` - Start development server with Turbopack

- `npm run build` - Build for production

// Find files by user- `npm run start` - Start production server

const files = await File.find({ userId: user._id })- `npm run lint` - Run ESLint

```- `npx prisma studio` - Open Prisma database browser



## 🔗 API Integration### Database Schema



### AuthenticationThe application uses Prisma with SQLite for development. Key models include:



All API endpoints require authentication via JWT token in cookies or Authorization header.- **User**: User accounts with authentication

- **ApiKey**: API keys for external integration

### Example API Usage- **File**: IPFS file metadata

- **Usage**: Monthly usage tracking

```javascript

// Upload a file## 🔗 API Integration

const formData = new FormData();

formData.append('file', file);### Authentication



const response = await fetch('/api/files/upload', {All API endpoints require authentication via JWT token in cookies or Authorization header.

  method: 'POST',

  body: formData,### Example API Usage

  headers: {

    'Authorization': `Bearer ${apiKey}````javascript

  }// Upload a file

});const formData = new FormData();

```formData.append('file', file);



## 🔒 Securityconst response = await fetch('/api/files/upload', {

  method: 'POST',

- JWT-based authentication with httpOnly cookies  body: formData,

- Password hashing with bcrypt  headers: {

- Input validation and sanitization    'Authorization': `Bearer ${apiKey}`

- MongoDB injection protection  }

- Environment variable protection});

```

## 🚀 Deployment

## 🔒 Security

### Production Environment

- JWT-based authentication with httpOnly cookies

1. **Set up MongoDB Atlas** (recommended for production)- Password hashing with bcrypt

2. **Environment Variables**- Input validation and sanitization

   ```env- CORS protection

   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/ipfs-cloud-portal?retryWrites=true&w=majority"- Environment variable protection

   JWT_SECRET="your-production-jwt-secret"

   ```## 🚀 Deployment



3. **Build and Start**### Production Environment

   ```bash

   npm run build1. **Environment Variables**

   npm run start   ```env

   ```   DATABASE_URL="your-production-database-url"

   JWT_SECRET="your-production-jwt-secret"

### Recommended Hosting   NEXTAUTH_URL="https://your-domain.com"

   ```

- **Frontend**: Vercel, Netlify

- **Database**: MongoDB Atlas2. **Database Migration**

- **IPFS**: Local node or Infura   ```bash

   npx prisma generate

## 🍃 Why Mongoose?   npx prisma db push

   ```

We chose Mongoose for this project because:

- **MongoDB-native**: Full access to MongoDB features3. **Build and Start**

- **Schema validation**: Built-in data validation   ```bash

- **Middleware**: Pre/post hooks for complex operations   npm run build

- **Plugins**: Rich ecosystem of plugins   npm run start

- **Performance**: Optimized for MongoDB operations   ```

- **GridFS support**: Easy large file handling

### Recommended Hosting

## 📝 Contributing

- **Frontend**: Vercel, Netlify

1. Fork the repository- **Database**: PlanetScale, Supabase, Railway

2. Create a feature branch (`git checkout -b feature/amazing-feature`)- **IPFS**: Local node or Infura

3. Commit your changes (`git commit -m 'Add amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)## 📝 Contributing

5. Open a Pull Request

1. Fork the repository

## 📄 License2. Create a feature branch (`git checkout -b feature/amazing-feature`)

3. Commit your changes (`git commit -m 'Add amazing feature'`)

This project is licensed under the MIT License - see the LICENSE file for details.4. Push to the branch (`git push origin feature/amazing-feature`)

5. Open a Pull Request

## 🗺️ Roadmap

## 📄 License

- [ ] Dashboard implementation

- [ ] File management interface  This project is licensed under the MIT License - see the LICENSE file for details.

- [ ] API key generation

- [ ] Usage analytics## 🤝 Support

- [ ] Billing integration

- [ ] Advanced IPFS features- Documentation: [Coming Soon]

- [ ] Mobile app- Issues: GitHub Issues

- Community: [Coming Soon]

---

## 🗺️ Roadmap

**Built with ❤️ for the decentralized web using Mongoose & MongoDB**
- [ ] Dashboard implementation
- [ ] File management interface  
- [ ] API key generation
- [ ] Usage analytics
- [ ] Billing integration
- [ ] Advanced IPFS features
- [ ] Mobile app

---

**Built with ❤️ for the decentralized web**