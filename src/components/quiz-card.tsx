'use client';
import { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { useUser } from '@/context/user-context';
import { cn } from '@/lib/utils';
import { Check, X, ChevronsRight, RotateCw, Trophy } from 'lucide-react';
import { Skeleton } from './ui/skeleton';

interface QuizCardProps {
  questions: QuizQuestion[];
}

export function QuizCard({ questions }: QuizCardProps) {
  const { addPoints } = useUser();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + currentQuestion.points);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      addPoints(score);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    return (
        <Card className="w-full">
            <CardHeader className="text-center">
                <Trophy className="mx-auto h-12 w-12 text-yellow-500" />
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>You've earned</CardDescription>
                <p className="text-4xl font-bold text-primary">{score} points!</p>
            </CardHeader>
            <CardContent className="text-center">
                <p>You answered {score / 50} out of {questions.length} questions correctly.</p>
            </CardContent>
            <CardFooter className="justify-center">
                <Button onClick={handleRestart}>
                    <RotateCw className="mr-2 h-4 w-4" />
                    Play Again
                </Button>
            </CardFooter>
        </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <Progress value={progress} className="mb-4" />
        <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
        <CardDescription className="text-lg font-semibold text-foreground pt-2">
            {currentQuestion.question}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {currentQuestion.options.map((option) => {
          const isCorrect = option === currentQuestion.correctAnswer;
          const isSelected = option === selectedAnswer;
          
          return (
            <Button
              key={option}
              variant="outline"
              className={cn(
                'w-full justify-start h-auto py-3 text-left',
                isAnswered && isCorrect && 'bg-green-500/20 border-green-500 text-foreground hover:bg-green-500/30',
                isAnswered && isSelected && !isCorrect && 'bg-red-500/20 border-red-500 text-foreground hover:bg-red-500/30'
              )}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
            >
              <div className="flex-1">{option}</div>
              {isAnswered && isCorrect && <Check className="h-5 w-5 text-green-600" />}
              {isAnswered && isSelected && !isCorrect && <X className="h-5 w-5 text-red-600" />}
            </Button>
          )
        })}
      </CardContent>
      <CardFooter className="justify-end">
        {isAnswered && (
          <Button onClick={handleNext}>
            {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            <ChevronsRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

QuizCard.Skeleton = function QuizCardSkeleton() {
    return (
        <Card className="w-full">
            <CardHeader>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-8 w-1/4 mt-4" />
                <Skeleton className="h-6 w-3/4 mt-2" />
            </CardHeader>
            <CardContent className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </CardContent>
            <CardFooter />
        </Card>
    )
}
