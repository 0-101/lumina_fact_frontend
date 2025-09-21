'use client';

import { useState } from 'react';
import { VerifiedClaim } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ArrowUp, ArrowDown, Tag, CheckCircle2, XCircle, User } from 'lucide-react';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface ClaimCardProps {
  claim: VerifiedClaim;
}

export function ClaimCard({ claim }: ClaimCardProps) {
  const [upvotes, setUpvotes] = useState(claim.upvotes);
  const [downvotes, setDownvotes] = useState(claim.downvotes);

  const isDebunked = claim.status === 'debunked';
  const StatusIcon = isDebunked ? XCircle : CheckCircle2;
  const statusColor = isDebunked ? 'text-red-500' : 'text-green-500';
  const statusText = isDebunked ? 'Debunked' : 'Verified';

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
            <div>
                <CardTitle className="text-xl mb-2">{claim.claim}</CardTitle>
                <div className="flex items-center gap-2">
                    <StatusIcon className={`w-6 h-6 ${statusColor}`} />
                    <span className={`font-semibold text-lg ${statusColor}`}>{statusText}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground flex-shrink-0">
                <Button variant="outline" size="sm" onClick={() => setUpvotes(v => v + 1)}>
                    <ArrowUp className="h-4 w-4 mr-1" /> {upvotes}
                </Button>
                <Button variant="outline" size="sm" onClick={() => setDownvotes(v => v + 1)}>
                    <ArrowDown className="h-4 w-4 mr-1" /> {downvotes}
                </Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base border-l-4 border-primary pl-4 py-2 bg-secondary/50 rounded-r-md">
          {claim.proof}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
         <div className="flex flex-wrap gap-2">
            {claim.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="capitalize">
                    <Tag className="w-3 h-3 mr-1.5" />
                    {tag}
                </Badge>
            ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Avatar className="h-6 w-6">
                <AvatarImage src={claim.moderator.avatarUrl} alt={claim.moderator.name} />
                <AvatarFallback><User /></AvatarFallback>
            </Avatar>
            <span>Verified by {claim.moderator.name}</span>
            <Separator orientation="vertical" className="h-4" />
            <span>{claim.createdAt}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
