'use client';

import { useEffect, useState } from 'react';
import { Swords, LogIn } from 'lucide-react';
import { useUser } from '@/context/user-context';
import { QuizCard } from '@/components/quiz-card';
import { StatsCard } from '@/components/stats-card';
import { Leaderboard } from '@/components/leaderboard';
import { LoginDialog } from '@/components/login-dialog';
import { Button } from '@/components/ui/button';
import { mockQuiz, mockLeaderboard } from '@/lib/mock-data';
import type { QuizQuestion, User } from '@/lib/types';

export default function QuizzesPage() {
  const { user } = useUser();
  const [isLoginDialogOpen, setLoginDialogOpen] = useState(false);
  const [quiz, setQuiz] = useState<QuizQuestion[] | null>(null);
  const [leaderboard, setLeaderboard] = useState<User[] | null>(null);

  useEffect(() => {
    // Simulate fetching data
    const timer = setTimeout(() => {
      setQuiz(mockQuiz);
      setLeaderboard(mockLeaderboard);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
            {quiz ? <QuizCard questions={quiz} /> : <QuizCard.Skeleton />}
        </div>
        <div className="space-y-8">
            <StatsCard user={user} />
            {leaderboard ? <Leaderboard users={leaderboard} currentUser={user} /> : <Leaderboard.Skeleton />}
        </div>
      </div>
    </div>
  );
}
