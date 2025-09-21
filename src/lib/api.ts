/**
 * Centralized API service that handles both mock and real backend calls
 * Controlled by NEXT_PUBLIC_USE_MOCKS environment variable
 */

import { mockUsers, mockPosts, mockTrending, mockQuiz, mockClaims } from './mock-data';
import type { 
  User, 
  Post, 
  TrendingItem, 
  QuizQuestion, 
  VerifiedClaim, 
  VerificationResult,
  Comment 
} from './types';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS === 'true'; // Default to false (live mode) if not set

// Mock API delay simulation
const MOCK_DELAY = 500; // 500ms delay to simulate real API calls

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generic API call function
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (USE_MOCKS) {
    await delay(MOCK_DELAY);
    throw new Error('Mock API calls should use mock functions directly');
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API call failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Mock API Functions
const mockApi = {
  // Verification - Uses Genkit AI in mock mode
  async verifyClaim(data: { claim: string; urlContent?: string; mediaDataUri?: string }): Promise<VerificationResult> {
    await delay(MOCK_DELAY);
    
    // In mock mode, use Genkit AI for real verification
    try {
      const { verifyClaim } = await import('@/ai/flows/verify-claim-flow');
      const result = await verifyClaim(data);
      return result;
    } catch (error) {
      console.error('Genkit verification failed in mock mode:', error);
      
      // Fallback to simple mock data if Genkit fails
      const mockResult: VerificationResult = {
        status: Math.random() > 0.5 ? 'verified' : 'debunked',
        claim_type: Math.random() > 0.5 ? 'static' : 'dynamic',
        summary: `This claim has been analyzed and ${Math.random() > 0.5 ? 'verified' : 'debunked'} based on available evidence.`,
        analysis: `Detailed analysis of the claim "${data.claim}". The evidence suggests this is ${Math.random() > 0.5 ? 'accurate' : 'misleading'} information.`,
        source_context: [
          {
            source: 'https://example.com/source1',
            snippet: 'Relevant information supporting the verification...'
          },
          {
            source: 'https://example.com/source2', 
            snippet: 'Additional evidence from credible source...'
          }
        ],
        disclaimer: 'This verification is based on available information and may change as new evidence emerges.'
      };
      
      return mockResult;
    }
  },

  // Community Posts
  async getPosts(): Promise<Post[]> {
    await delay(MOCK_DELAY);
    return mockPosts;
  },

  async createPost(data: { content: string; tags: string[]; userId: string }): Promise<Post> {
    await delay(MOCK_DELAY);
    
    const newPost: Post = {
      post_id: `post_${Date.now()}`,
      user: mockUsers[0], // Use first user as author
      content: data.content,
      tags: data.tags,
      votes: 0,
      comments: [],
      createdAt: 'Just now'
    };
    
    return newPost;
  },

  async getPostComments(postId: string): Promise<Comment[]> {
    await delay(MOCK_DELAY);
    const post = mockPosts.find(p => p.post_id === postId);
    return post?.comments || [];
  },

  async addComment(postId: string, data: { text: string; userId: string }): Promise<Comment> {
    await delay(MOCK_DELAY);
    
    const newComment: Comment = {
      id: `comment_${Date.now()}`,
      user: mockUsers[0],
      text: data.text
    };
    
    return newComment;
  },

  async votePost(postId: string, vote: 'up' | 'down'): Promise<{ success: boolean; newVoteCount: number }> {
    await delay(MOCK_DELAY);
    
    const post = mockPosts.find(p => p.post_id === postId);
    if (post) {
      post.votes += vote === 'up' ? 1 : -1;
      return { success: true, newVoteCount: post.votes };
    }
    
    return { success: false, newVoteCount: 0 };
  },

  // Trending
  async getTrending(): Promise<TrendingItem[]> {
    await delay(MOCK_DELAY);
    return mockTrending;
  },

  // Quizzes
  async getDailyQuiz(): Promise<QuizQuestion[]> {
    await delay(MOCK_DELAY);
    return mockQuiz;
  },

  async submitQuizAnswers(answers: { questionId: string; answer: string }[]): Promise<{ 
    score: number; 
    totalQuestions: number; 
    correctAnswers: number;
    pointsEarned: number;
  }> {
    await delay(MOCK_DELAY);
    
    let correctAnswers = 0;
    answers.forEach(({ questionId, answer }) => {
      const question = mockQuiz.find(q => q.id === questionId);
      if (question && question.correctAnswer === answer) {
        correctAnswers++;
      }
    });
    
    const score = Math.round((correctAnswers / answers.length) * 100);
    const pointsEarned = correctAnswers * 10; // 10 points per correct answer
    
    return {
      score,
      totalQuestions: answers.length,
      correctAnswers,
      pointsEarned
    };
  },

  // User Stats
  async getUserStats(userId: string): Promise<{
    points: number;
    streak: number;
    totalClaims: number;
    verifiedClaims: number;
    debunkedClaims: number;
    communityPosts: number;
    comments: number;
    quizAttempts: number;
    correctAnswers: number;
    totalQuestions: number;
  }> {
    await delay(MOCK_DELAY);
    
    const user = mockUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    return {
      points: user.points,
      streak: user.streak,
      totalClaims: 24,
      verifiedClaims: 18,
      debunkedClaims: 6,
      communityPosts: 12,
      comments: 45,
      quizAttempts: 8,
      correctAnswers: 32,
      totalQuestions: 40
    };
  },

  // Leaderboard
  async getLeaderboard(): Promise<User[]> {
    await delay(MOCK_DELAY);
    return mockUsers.sort((a, b) => b.points - a.points);
  }
};

// Real API Functions
const realApi = {
  async verifyClaim(data: { claim: string; urlContent?: string; mediaDataUri?: string }): Promise<VerificationResult> {
    return apiCall<VerificationResult>('/verify', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async getPosts(): Promise<Post[]> {
    return apiCall<Post[]>('/community/posts');
  },

  async createPost(data: { content: string; tags: string[]; userId: string }): Promise<Post> {
    return apiCall<Post>('/community/posts', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async getPostComments(postId: string): Promise<Comment[]> {
    return apiCall<Comment[]>(`/community/posts/${postId}/comments`);
  },

  async addComment(postId: string, data: { text: string; userId: string }): Promise<Comment> {
    return apiCall<Comment>(`/community/posts/${postId}/comments`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  },

  async votePost(postId: string, vote: 'up' | 'down'): Promise<{ success: boolean; newVoteCount: number }> {
    return apiCall<{ success: boolean; newVoteCount: number }>(`/community/posts/${postId}/vote`, {
      method: 'POST',
      body: JSON.stringify({ vote })
    });
  },

  async getTrending(): Promise<TrendingItem[]> {
    return apiCall<TrendingItem[]>('/trending');
  },

  async getDailyQuiz(): Promise<QuizQuestion[]> {
    return apiCall<QuizQuestion[]>('/quiz/daily');
  },

  async submitQuizAnswers(answers: { questionId: string; answer: string }[]): Promise<{ 
    score: number; 
    totalQuestions: number; 
    correctAnswers: number;
    pointsEarned: number;
  }> {
    return apiCall<{ 
      score: number; 
      totalQuestions: number; 
      correctAnswers: number;
      pointsEarned: number;
    }>('/quiz/submit', {
      method: 'POST',
      body: JSON.stringify({ answers })
    });
  },

  async getUserStats(userId: string): Promise<{
    points: number;
    streak: number;
    totalClaims: number;
    verifiedClaims: number;
    debunkedClaims: number;
    communityPosts: number;
    comments: number;
    quizAttempts: number;
    correctAnswers: number;
    totalQuestions: number;
  }> {
    return apiCall<{
      points: number;
      streak: number;
      totalClaims: number;
      verifiedClaims: number;
      debunkedClaims: number;
      communityPosts: number;
      comments: number;
      quizAttempts: number;
      correctAnswers: number;
      totalQuestions: number;
    }>(`/user/stats/${userId}`);
  },

  async getLeaderboard(): Promise<User[]> {
    return apiCall<User[]>('/leaderboard');
  }
};

// Export the appropriate API based on environment
export const api = USE_MOCKS ? mockApi : realApi;

// Export configuration for debugging
export const apiConfig = {
  useMocks: USE_MOCKS,
  baseUrl: API_BASE_URL,
  mockDelay: MOCK_DELAY
};

// Export types for API responses
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Helper function to wrap API calls with error handling
export async function withErrorHandling<T>(
  apiCall: () => Promise<T>
): Promise<ApiResponse<T>> {
  try {
    const data = await apiCall();
    return { success: true, data };
  } catch (error) {
    console.error('API call failed:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}
