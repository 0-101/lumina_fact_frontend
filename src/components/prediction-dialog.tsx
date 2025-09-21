'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from './ui/button';
import { ThumbsDown, ThumbsUp, HelpCircle } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface PredictionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (prediction: 'misinformation' | 'accurate' | 'none') => void;
}

export function PredictionDialog({ open, onOpenChange, onConfirm }: PredictionDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Make a Prediction & Earn Points!</AlertDialogTitle>
          <AlertDialogDescription className="text-base text-foreground pt-2">
            Before we reveal the results, what are you feeling? A correct prediction will earn you 25 points.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row sm:justify-center gap-2 pt-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full sm:w-auto"
                  onClick={() => onConfirm('misinformation')}
                >
                  <ThumbsDown className="mr-2" />
                  Misinformation
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Likely Misinformation</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="default"
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700"
                  onClick={() => onConfirm('accurate')}
                >
                  <ThumbsUp className="mr-2" />
                  Accurate
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Looks Accurate</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => onConfirm('none')}
                >
                  <HelpCircle className="mr-2" />
                  Skip
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Submit without guess</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
