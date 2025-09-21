import { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Trophy, Flame, Badge as BadgeIconLucide, User as UserIcon, ShieldCheck, Swords, Crown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import type { LucideIcon } from 'lucide-react';

const badgeIcons: { [key: string]: LucideIcon } = {
    ShieldCheck,
    Swords,
    Crown,
    BadgeIcon: BadgeIconLucide,
};

interface StatsCardProps {
    user: User;
}

export function StatsCard({ user }: StatsCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback><UserIcon className="h-8 w-8" /></AvatarFallback>
                    </Avatar>
                    <div>
                        <CardTitle className="text-2xl">{user.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{user.role}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-around text-center">
                    <div>
                        <div className="flex items-center justify-center gap-2">
                           <Trophy className="h-6 w-6 text-yellow-500" />
                           <p className="text-2xl font-bold">{user.points}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Points</p>
                    </div>
                     <div>
                        <div className="flex items-center justify-center gap-2">
                           <Flame className="h-6 w-6 text-orange-500" />
                           <p className="text-2xl font-bold">{user.streak}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">Streak</p>
                    </div>
                </div>
                <div>
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <BadgeIconLucide className="h-4 w-4" />
                        My Badges
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        <TooltipProvider>
                        {user.badges.map(badge => {
                            const Icon = badgeIcons[badge.icon];
                            return Icon ? (
                                <Tooltip key={badge.name}>
                                    <TooltipTrigger>
                                        <div className="p-2 bg-secondary rounded-md">
                                            <Icon className={`w-6 h-6 ${badge.color}`} />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{badge.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ) : null
                        })}
                        </TooltipProvider>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
