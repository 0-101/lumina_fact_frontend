# 🛡️ Misinformation Detection Frontend

This is the **frontend** for the Misinformation Detection & Community Platform.  
It is built with **Next.js 14** and **Tailwind CSS**, designed to integrate seamlessly with the backend (FastAPI + Google Cloud).  
The prototype can also run standalone with mocked APIs for demo purposes.

## 🚀 Features

### Core Pages

1. **Verification Page**
   - Submit text, media, or links for fact-checking
   - Displays classification results (Static, Live, High-Risk, Invalid)
   - Shows Gemini's verification output or RAG-enhanced response

2. **Community Page**
   - Post and discuss flagged misinformation
   - Upvote/downvote and comment on posts
   - Moderator section for verified claims with supporting proof

3. **Trending Misinformation**
   - Highlights most engaged and viral misinformation cases
   - Helps users quickly see what's trending and verified

4. **Gamification & Education**
   - Daily quizzes to test user awareness
   - Streak tracking, points, and badges for participation
   - Leaderboard to encourage engagement

5. **Chatbot Integration**
   - Interface preview for WhatsApp & Telegram
   - Demonstrates how users can forward claims to bots for instant verification

## 🏗️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Query / Context API
- **API Layer**: Axios-based service modules
- **Auth (Prototype)**: NextAuth.js (can use mocked mode for demo)
- **Charts/Stats**: Recharts.js
- **Forms & Validation**: React Hook Form + Zod

## ⚙️ Setup & Installation

### Prerequisites
- Node.js `>=18`
- npm or yarn

### Steps
```bash
# Clone repo
git clone https://github.com/your-org/lumino_fact_frontend.git
cd lumino_fact_frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Run development server
npm run dev

# Build for production
npm run build
npm run start
```

## 🔑 Environment Variables

Create `.env.local`:

```bash
# Google AI API Key for fact-checking
GOOGLE_AI_API_KEY=your_api_key_here

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_USE_MOCKS=true

# NextAuth Configuration (for future use)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000
```

### Mock Mode Configuration

- **`NEXT_PUBLIC_USE_MOCKS=true`**: Uses local mock data with Genkit AI
- **`NEXT_PUBLIC_USE_MOCKS=false`** or **not set**: Uses real backend API (default)
- **`NEXT_PUBLIC_API_BASE_URL`**: Backend API URL when not using mocks

## 🧪 Running Prototype Without Backend

When `NEXT_PUBLIC_USE_MOCKS=true`, the app will:

- Use Genkit AI for real claim verification (requires GOOGLE_AI_API_KEY)
- Use static mock data for trending items, community posts, and other features
- Allow full navigation and interaction without backend setup
- Useful for video demos and early user testing

When `NEXT_PUBLIC_USE_MOCKS=false` or not set (default), the app will:

- Use real backend API for all features including verification
- Send verification requests to `/verify` endpoint on your backend
- Require a running backend server

## 📊 Gamification Logic

- **Daily Quiz**: Users answer short fact-checking questions
- **Streaks**: Consecutive days of participation are tracked
- **Points & Badges**: Awarded for quizzes, posting, and engagement
- **Leaderboard**: Sorted by points to increase competitiveness

## 🔐 Authentication (Prototype)

- NextAuth.js is integrated with credentials provider
- In mock mode, users can log in with any username/password to simulate roles (e.g., moderator, user)


### Local Demo
```bash
npm run dev
```

### Vercel (Recommended)
1. Push repo to GitHub
2. Import into Vercel
3. Add environment variables in Vercel dashboard
```

## 👥 Roles & Permissions

- **User**: Verify claims, join discussions, quizzes
- **Moderator**: Approve/reject community posts, verify claims
- **Guest**: Can view content but limited actions