# Lumina Fact - AI-Powered Misinformation Detection Platform

A comprehensive Next.js application that leverages AI to detect, verify, and combat misinformation through community engagement, gamification, and real-time fact-checking.

## 🚀 Features

### 2.1 Misinformation Verification
- **ClaimForm Component**: Submit text, URLs, or media files for verification
- **ClaimResult Component**: Display verification results with structured analysis
- **AI-Powered Analysis**: Real-time fact-checking using Google's Gemini AI
- **Source Attribution**: Credible sources and evidence for each verification
- **Claim Classification**: Static, dynamic, high-risk, and invalid claim types

### 2.2 Community Features
- **Community Page**: Interactive posts with voting, comments, and tags
- **Trending Page**: Most engaged misinformation and verified claims
- **User Engagement**: Upvote/downvote posts and comments
- **Moderator System**: Verified posts and user badges
- **Content Filtering**: Tag-based filtering (health, finance, politics, etc.)

### 2.3 Gamification & Daily Quizzes
- **Daily Quizzes**: 3-5 multiple-choice questions about recent misinformation
- **Points System**: Earn points for correct answers and community participation
- **Leaderboard**: Track top users by engagement and quiz performance
- **Badge System**: Unlock achievements and recognition levels
- **Streak Tracking**: Maintain daily participation streaks

## 🛠 Tech Stack

- **Framework**: Next.js 15.3.3 with App Router
- **Styling**: TailwindCSS with custom components
- **AI Integration**: Google Genkit with Gemini 2.5 Flash
- **UI Components**: Radix UI primitives
- **State Management**: React Context
- **Type Safety**: TypeScript
- **Icons**: Lucide React

## 📁 Project Structure

```
src/
├── ai/                          # AI/ML integration layer
│   ├── genkit.ts               # Genkit configuration
│   ├── dev.ts                  # Development setup
│   └── flows/
│       └── verify-claim-flow.ts # Core fact-checking logic
├── app/                        # Next.js App Router pages
│   ├── page.tsx               # Home page with claim verification
│   ├── community/             # Community features
│   ├── trending/              # Trending misinformation
│   └── quizzes/               # Daily quiz system
├── components/                 # Reusable UI components
│   ├── ui/                    # Base UI components (Radix UI)
│   ├── claim-form.tsx         # Claim submission form
│   ├── claim-result.tsx       # Verification results display
│   ├── discussion-post-card.tsx # Community post component
│   ├── trending-card.tsx      # Trending content card
│   ├── quiz-card.tsx          # Quiz question component
│   └── leaderboard.tsx        # User rankings
├── context/                   # React Context providers
│   └── user-context.tsx       # User state management
├── lib/                       # Utility functions and types
│   ├── actions.ts             # Server actions for API calls
│   ├── types.ts               # TypeScript type definitions
│   └── mock-data.ts           # Mock data for prototype
└── hooks/                     # Custom React hooks
    └── use-toast.ts           # Toast notifications
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Google AI API key

### Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd lumino_fact_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   # Google AI API Key for fact-checking
   GOOGLE_AI_API_KEY=your_api_key_here
   ```
   
   Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run genkit:dev` - Start Genkit development server
- `npm run genkit:watch` - Start Genkit with file watching

## 🎯 Core Features Implementation

### Claim Verification Flow
1. User submits claim via `ClaimForm`
2. AI analyzes content using Gemini 2.5 Flash
3. Returns structured verification with sources
4. Results displayed in `ClaimResult` component

### Community Engagement
- **Posts**: Create and view community discussions
- **Voting**: Upvote/downvote posts and comments
- **Comments**: Threaded discussions under posts
- **Tags**: Categorize content by topic
- **Moderation**: Verified posts and user badges

### Gamification System
- **Daily Quizzes**: Multiple-choice questions about misinformation
- **Points**: Earn points for correct answers and participation
- **Badges**: Unlock achievements and recognition
- **Leaderboard**: Track top performers
- **Streaks**: Maintain daily participation

## 🔌 API Integration

### Expected Backend Endpoints
- `POST /verify` - Claim verification
- `GET /community/posts` - List community posts
- `POST /community/posts` - Create new post
- `GET /community/posts/{id}/comments` - Get post comments
- `POST /community/posts/{id}/comments` - Add comment
- `POST /community/posts/{id}/vote` - Vote on post
- `GET /trending` - Fetch trending content
- `GET /quiz/daily` - Get daily quiz
- `POST /quiz/submit` - Submit quiz answers
- `GET /user/stats` - Get user statistics

### Current Status
⚠️ **Prototype Mode**: Currently uses mock data for demonstration. Backend integration pending.

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Accessibility**: ARIA tags and semantic HTML
- **Dark/Light Mode**: Theme toggle support (optional)
- **Loading States**: Smooth animations and placeholders
- **Error Handling**: Graceful error management with toast notifications
- **Component Library**: Reusable, composable components

## 🏗 Architecture

### Modular Design
- **Self-contained features** with dedicated folders
- **React Context** for global state management
- **Custom hooks** for reusable logic
- **Composable components** for maximum reusability

### State Management
- **User Context**: Authentication, points, badges
- **Local State**: Component-specific state
- **Server State**: API data fetching and caching

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Static site generation
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Google Genkit](https://firebase.google.com/docs/genkit) for AI integration
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

---

**Note**: This is a prototype implementation using mock data. Backend integration and production deployment require additional API development and configuration.
