'use client';

import { useState } from 'react';
import { Post } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { ArrowUp, ArrowDown, MessageCircle, Tag, User, ShieldCheck, Swords, Crown, Badge as BadgeIconLucide } from 'lucide-react';
import { Badge } from './ui/badge';
import { CommentCard } from './comment-card';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { useUser } from '@/context/user-context';
import type { LucideIcon } from 'lucide-react';

const badgeIcons: { [key: string]: LucideIcon } = {
    ShieldCheck,
    Swords,
    Crown,
    BadgeIcon: BadgeIconLucide,
};

interface DiscussionPostCardProps {
    post: Post;
}

export function DiscussionPostCard({ post }: DiscussionPostCardProps) {
  const { user: currentUser } = useUser();
  const [votes, setVotes] = useState(post.votes);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start gap-4">
        <Avatar>
          <AvatarImage src={post.user.avatarUrl} alt={post.user.name} />
          <AvatarFallback><User /></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold">{post.user.name}</span>
            <div className="flex gap-1">
              {post.user.badges.map(badge => {
                const Icon = badgeIcons[badge.icon];
                return Icon ? <Icon key={badge.name} className={`w-4 h-4 ${badge.color}`} /> : null
              })}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">{post.createdAt}</p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
           <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setVotes(v => v + 1)}>
             <ArrowUp className="h-4 w-4" />
           </Button>
           <span className="font-bold text-lg text-foreground">{votes}</span>
           <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setVotes(v => v - 1)}>
             <ArrowDown className="h-4 w-4" />
           </Button>
         </div>
      </CardHeader>
      <CardContent>
        <p className="text-base font-semibold text-lg">{post.content}</p>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="capitalize">
                    <Tag className="w-3 h-3 mr-1.5" />
                    {tag}
                </Badge>
            ))}
        </div>
        <Separator className="my-4" />
        <div className="w-full space-y-4">
            <h4 className="flex items-center gap-2 text-sm font-semibold">
                <MessageCircle className="w-4 h-4" />
                Comments ({post.comments.length})
            </h4>
            {post.comments.map(comment => (
                <CommentCard key={comment.id} comment={comment} />
            ))}
            {currentUser && (
                <div className="flex items-start gap-4 pt-4">
                    <Avatar>
                      <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                        <Textarea placeholder="Add your comment..." />
                        <Button size="sm">Post Comment</Button>
                    </div>
                </div>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
