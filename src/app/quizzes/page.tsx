'use client';

import { useEffect, useState } from 'react';
import { Swords, LogIn, Loader2 } from 'lucide-react';
import { useUser } from '@/context/user-context';
import { QuizCard } from '@/components/quiz-card';
import { StatsCard } from '@/components/stats-card';
import { Leaderboard } from '@/components/leaderboard';
import { LoginDialog } from '@/components/login-dialog';
import { Button } from '@/components/ui/button';
import { apiClient } from '@/lib/api-client';
import type { QuizQuestion, User } from '@/lib/types';

export default function QuizzesPage() {
  const { user } = useUser();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [leaderboard, setLeaderboard] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const [quizResult, leaderboardResult] = await Promise.all([
          apiClient.getDailyQuiz(),
          apiClient.getLeaderboard()
        ]);

        if (quizResult.success && quizResult.data) {
          setQuiz(quizResult.data);
        } else {
          setError(quizResult.error || 'Failed to load quiz');
        }

        if (leaderboardResult.success && leaderboardResult.data) {
          setLeaderboard(leaderboardResult.data);
        }
      } catch (err) {
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  if (!user) {
    return (
      <>
        <div className="container mx-auto flex flex-col items-center justify-center text-center h-[60vh]">
          <Swords className="w-16 h-16 text-primary mb-4" />
          <h2 className="text-2xl font-bold">Access Denied</h2>
          <p className="text-muted-foreground mt-2 mb-6">You need to be logged in to take quizzes and view stats.</p>
          <Button onClick={() => setLoginDialogOpen(true)}>
            <LogIn className="mr-2 h-4 w-4" />
            Login to Continue
          </Button>
        </div>
        <LoginDialog open={isLoginDialogOpen} onOpenChange={setLoginDialogOpen} title="Login" />
      </>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-headline flex items-center justify-center gap-3">
          <Swords className="w-10 h-10 text-primary" />
          Daily Quiz & Stats
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Test your knowledge, earn points, and climb the leaderboard!
        </p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading quiz...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">
              <p>Error: {error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4"
                variant="outline"
              >
                Retry
              </Button>
            </div>
          ) : quiz ? (
            <QuizCard questions={quiz} />
          ) : (
            <QuizCard.Skeleton />
          )}
        </div>
        <div className="space-y-8">
          <StatsCard user={user} />
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="ml-2">Loading leaderboard...</span>
            </div>
          ) : leaderboard ? (
            <Leaderboard users={leaderboard} currentUser={user} />
          ) : (
            <Leaderboard.Skeleton />
          )}
        </div>
      </div>
    </div>
  );
}
