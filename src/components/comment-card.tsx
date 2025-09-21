import { Comment } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { User, ShieldCheck, Swords, Crown, Badge as BadgeIconLucide } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const badgeIcons: { [key: string]: LucideIcon } = {
    ShieldCheck,
    Swords,
    Crown,
    BadgeIcon: BadgeIconLucide,
};

interface CommentCardProps {
    comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="flex items-start gap-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src={comment.user.avatarUrl} alt={comment.user.name} />
        <AvatarFallback><User /></AvatarFallback>
      </Avatar>
      <div className="flex-1 bg-secondary/50 rounded-lg p-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold">{comment.user.name}</span>
          <div className="flex gap-1">
            {comment.user.badges.map(badge => {
              const Icon = badgeIcons[badge.icon];
              return Icon ? (
                <span key={badge.name} title={badge.name}>
                  <Icon className={`w-3 h-3 ${badge.color}`} />
                </span>
              ) : null;
            })}
          </div>
        </div>
        <p className="text-sm text-foreground/90">{comment.text}</p>
      </div>
    </div>
  );
}
