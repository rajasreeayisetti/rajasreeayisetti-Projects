# AgroTech AI

## Project Structure
- **frontend/**: React App with Vite
- **backend/**: Node.js + Express Server
- **data/**: Agricultural Manuals and Government Schemes PDFs

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm start
```

## Features
- **Crop Doctor**: Multimodal AI for crop disease diagnosis using Gemini Vision.
- **Scheme Finder**: RAG-based search for government schemes eligibility.
- **Market Trends**: AI summary of market news and prices.
- **Voice Support**: Voice-to-text for easy interaction for farmers.

## RAG Knowledge Base
The system uses a knowledge base stored in `data/` and indexed in Pinecone.
- **Manuals**: Standard agricultural operating procedures.
- **Schemes**: Official government scheme documents.

## Tech Stack
- Frontend: React, Vanilla CSS (Premium Design)
- Backend: Node.js, Express
- AI: Gemini Vision, RAG (Pinecone + Embeddings)
