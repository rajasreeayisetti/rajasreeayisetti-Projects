# Environment Variables Setup

Here are the `.env` files for both your backend and frontend.

## 1. Backend (.env)
**Location:** `backend/.env`

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/agrotech

# AI Services
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# RAG / Vector Database (Pinecone)
PINECONE_API_KEY=your_pinecone_api_key_here
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=agrotech-index

# Optional: JWT Secret (if auth is implemented later)
JWT_SECRET=agrotech_super_secret_key_123
```

## 2. Frontend (.env)
**Location:** `frontend/.env`

```env
VITE_API_URL=http://localhost:5000/api
```
