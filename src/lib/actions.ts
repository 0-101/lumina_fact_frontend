'use server';

import { z } from 'zod';
import type { VerificationResult } from './types';
import { api, withErrorHandling } from './api';

const claimSchema = z.object({
  claimText: z.string().optional(),
  // Only validate non-empty strings as URLs
  claimUrl: z.string().url().optional().or(z.literal('')),
  claimFile: z.instanceof(File).optional(),
});

type ActionResponse = {
  success: boolean;
  data?: VerificationResult;
  error?: string;
};

async function getUrlContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    // For simplicity, we'll try to get text. In a real app, you might need a more complex scraper.
    // This will not work for sites that heavily rely on client-side JS like Instagram.
    return await response.text();
  } catch (error) {
    console.error(`Failed to fetch URL content for ${url}:`, error);
    throw new Error(`Could not access content from the provided URL. It may be private or inaccessible.`);
  }
}

async function fileToDataURI(file: File): Promise<string> {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return `data:${file.type};base64,${buffer.toString('base64')}`;
}

export async function verifyClaimAction(
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = {
      claimText: formData.get('claimText') as string,
      claimUrl: formData.get('claimUrl') as string,
      claimFile: formData.get('claimFile') as File,
    };
    
    // Server-side validation
    const parsedData = claimSchema.safeParse(rawData);

    if (!parsedData.success) {
      return { success: false, error: parsedData.error.errors.map(e => e.message).join(', ') };
    }

    const { claimText, claimUrl, claimFile } = parsedData.data;

    if (!claimText && !claimUrl && (!claimFile || claimFile.size === 0)) {
      return { success: false, error: 'Please provide a claim, URL, or a file.' };
    }
    
    const apiInput = {
        claim: claimText || '',
        urlContent: undefined as string | undefined,
        mediaDataUri: undefined as string | undefined,
    };

    if (claimUrl) {
      try {
        const urlContent = await getUrlContent(claimUrl);
        apiInput.urlContent = `Content from ${claimUrl}:\n\n${urlContent.substring(0, 5000)}...`; // Limit context size
      } catch (error) {
        return { success: false, error: (error as Error).message };
      }
    }

    if (claimFile && claimFile.size > 0) {
        apiInput.mediaDataUri = await fileToDataURI(claimFile);
    }

    // Use the centralized API service
    const result = await withErrorHandling(() => api.verifyClaim(apiInput));
    
    if (result.success && result.data) {
      return { success: true, data: result.data };
    } else {
      return { success: false, error: result.error || 'Verification failed' };
    }
  } catch (error) {
    console.error('Error in verifyClaimAction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      success: false,
      error: `An unexpected error occurred during verification: ${errorMessage}`,
    };
  }
}

// Additional server actions for other features
export async function getPostsAction() {
  return withErrorHandling(() => api.getPosts());
}

export async function createPostAction(data: { content: string; tags: string[]; userId: string }) {
  return withErrorHandling(() => api.createPost(data));
}

export async function getTrendingAction() {
  return withErrorHandling(() => api.getTrending());
}

export async function getDailyQuizAction() {
  return withErrorHandling(() => api.getDailyQuiz());
}

export async function submitQuizAction(answers: { questionId: string; answer: string }[]) {
  return withErrorHandling(() => api.submitQuizAnswers(answers));
}

export async function getUserStatsAction(userId: string) {
  return withErrorHandling(() => api.getUserStats(userId));
}

export async function getLeaderboardAction() {
  return withErrorHandling(() => api.getLeaderboard());
}
