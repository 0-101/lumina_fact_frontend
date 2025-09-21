'use client';

import { useState } from 'react';
import { ClaimForm } from '@/components/claim-form';
import { ClaimResult } from '@/components/claim-result';
import type { VerificationResult } from '@/lib/types';
import { Sparkles } from 'lucide-react';
import { PredictionDialog } from '@/components/prediction-dialog';
import { useUser } from '@/context/user-context';

export default function Home() {
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPredictionDialogOpen, setPredictionDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const { user, addPoints } = useUser();


  const handleFormSubmit = (data: FormData) => {
    setFormData(data);
    setPredictionDialogOpen(true);
  };

  const handlePrediction = async (prediction: 'misinformation' | 'accurate' | 'none') => {
    setPredictionDialogOpen(false);
    if (!formData) return;

    setIsLoading(true);
    setResult(null);
    setError(null);
    
    // In a real app, you might save the prediction
    console.log('User prediction:', prediction);

    const { verifyClaimAction } = await import('@/lib/actions');
    const response = await verifyClaimAction(formData);
    
    if (response.success && response.data) {
      setResult(response.data);
      // Award points if the user is logged in and made a prediction
      if (user && prediction !== 'none') {
        const isCorrect = 
            (prediction === 'accurate' && (response.data.status === 'verified' || response.data.status === 'partially-verified')) ||
            (prediction === 'misinformation' && response.data.status === 'debunked');
            
        if (isCorrect) {
          addPoints(25); // Award 25 points for a correct prediction
        }
      }
    } else {
      setError(response.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
    setFormData(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-headline flex items-center justify-center gap-3">
          <Sparkles className="w-10 h-10 text-primary" />
          Lumina Fact
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Your AI-powered assistant for navigating the complex information landscape. Submit a claim and let our system provide a clear, evidence-backed verification.
        </p>
      </header>
      
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
        <div className="w-full">
          <ClaimForm onSubmit={handleFormSubmit} isLoading={isLoading} />
        </div>
        <div className="w-full">
          <ClaimResult result={result} isLoading={isLoading} error={error} />
        </div>
      </main>

      <PredictionDialog
        open={isPredictionDialogOpen}
        onOpenChange={setPredictionDialogOpen}
        onConfirm={handlePrediction}
      />
    </div>
  );
}
