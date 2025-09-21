/**
 * Client-side API service for components
 * Uses server actions for data fetching
 */

import { 
  getPostsAction,
  createPostAction,
  getTrendingAction,
  getDailyQuizAction,
  submitQuizAction,
  getUserStatsAction,
  getLeaderboardAction
} from './actions';
import type { 
  Post, 
  TrendingItem, 
  QuizQuestion, 
  User 
} from './types';

// Client-side API service
export const apiClient = {
  // Community Posts
  async getPosts() {
    return getPostsAction();
  },

  async createPost(data: { content: string; tags: string[]; userId: string }) {
    return createPostAction(data);
  },

  // Trending
  async getTrending() {
    return getTrendingAction();
  },

  // Quizzes
  async getDailyQuiz() {
    return getDailyQuizAction();
  },

  async submitQuiz(answers: { questionId: string; answer: string }[]) {
    return submitQuizAction(answers);
  },

  // User Stats
  async getUserStats(userId: string) {
    return getUserStatsAction(userId);
  },

  // Leaderboard
  async getLeaderboard() {
    return getLeaderboardAction();
  }
};

// React hooks for data fetching (optional - can be used with React Query or SWR)
export const useApi = () => {
  return {
    getPosts: apiClient.getPosts,
    createPost: apiClient.createPost,
    getTrending: apiClient.getTrending,
    getDailyQuiz: apiClient.getDailyQuiz,
    submitQuiz: apiClient.submitQuiz,
    getUserStats: apiClient.getUserStats,
    getLeaderboard: apiClient.getLeaderboard
  };
};
