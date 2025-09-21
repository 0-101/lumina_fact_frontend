'use client';

import type { VerificationResult } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, XCircle, AlertTriangle, Sparkles, Bot } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

interface ClaimResultProps {
  result: VerificationResult | null;
  isLoading: boolean;
  error: string | null;
}

const statusConfig = {
  verified: {
    icon: CheckCircle2,
    color: 'bg-green-500',
    text: 'Verified',
  },
  debunked: {
    icon: XCircle,
    color: 'bg-red-500',
    text: 'Debunked',
  },
  'partially-verified': {
    icon: AlertTriangle,
    color: 'bg-yellow-500',
    text: 'Partially Verified',
  },
  inconclusive: {
    icon: AlertTriangle,
    color: 'bg-gray-500',
    text: 'Inconclusive',
  },
};

export function ClaimResult({ result, isLoading, error }: ClaimResultProps) {
  const renderContent = () => {
    if (isLoading) {
      return <ResultSkeleton />;
    }

    if (error) {
      return (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Verification Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      );
    }
    
    if (!result) {
      return (
        <div className="text-center text-muted-foreground py-10">
          <Bot className="mx-auto h-12 w-12" />
          <p className="mt-4">Your verification results will appear here.</p>
        </div>
      );
    }

    const currentStatus = statusConfig[result.status];
    const StatusIcon = currentStatus.icon;

    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
             <StatusIcon className={`h-8 w-8 text-white p-1 rounded-full ${currentStatus.color}`} />
            <h3 className="text-2xl font-bold">{currentStatus.text}</h3>
          </div>
          <Badge variant="outline" className="py-1 px-3">
            {result.claim_type.charAt(0).toUpperCase() + result.claim_type.slice(1)} Claim
          </Badge>
        </div>
        
        <Alert className="mb-6 bg-accent/30">
          <Sparkles className="h-4 w-4 text-accent-foreground" />
          <AlertTitle className="font-semibold text-accent-foreground">AI Disclaimer</AlertTitle>
          <AlertDescription className="text-accent-foreground/80">
            {result.disclaimer}
          </AlertDescription>
        </Alert>

        <Accordion type="single" collapsible defaultValue="summary" className="w-full">
          <AccordionItem value="summary">
            <AccordionTrigger className="text-lg font-semibold">AI Summary</AccordionTrigger>
            <AccordionContent className="text-base prose prose-sm dark:prose-invert max-w-none">
              <p>{result.summary}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="analysis">
            <AccordionTrigger className="text-lg font-semibold">Detailed Analysis</AccordionTrigger>
            <AccordionContent className="text-base prose prose-sm dark:prose-invert max-w-none">
                <p>{result.analysis}</p>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="sources">
            <AccordionTrigger className="text-lg font-semibold">Sources</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-4">
                {result.source_context.map((source, index) => (
                  <li key={index} className="p-4 bg-secondary/50 rounded-lg">
                    <p className="italic text-muted-foreground">"{source.snippet}"</p>
                    <a
                      href={source.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:underline mt-2 block break-all"
                    >
                      {source.source}
                    </a>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    );
  };
  
  return (
    <Card className="w-full min-h-[500px]">
      <CardHeader>
        <CardTitle>Verification Result</CardTitle>
        <CardDescription>AI-powered analysis of the submitted claim.</CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}

function ResultSkeleton() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <Skeleton className="h-7 w-32" />
                </div>
                <Skeleton className="h-7 w-24" />
            </div>
            <Skeleton className="h-16 w-full" />
            <div className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
        </div>
    );
}
