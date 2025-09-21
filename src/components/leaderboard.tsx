import { User } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Crown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';
import { Skeleton } from './ui/skeleton';

interface LeaderboardProps {
    users: User[];
    currentUser: User;
}

export function Leaderboard({ users, currentUser }: LeaderboardProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Crown className="text-yellow-500" />
                    Leaderboard
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">Rank</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, index) => (
                            <TableRow key={user.id} className={cn(user.id === currentUser.id && 'bg-accent')}>
                                <TableCell className="font-medium text-lg">{index + 1}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={user.avatarUrl} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{user.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right font-semibold">{user.points}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

Leaderboard.Skeleton = function LeaderboardSkeleton() {
    return (
        <Card>
            <CardHeader>
                 <Skeleton className="h-8 w-40" />
            </CardHeader>
            <CardContent className="space-y-2">
                {[...Array(5)].map((_, i) => (
                     <div key={i} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-5 w-24" />
                         </div>
                         <Skeleton className="h-5 w-12" />
                     </div>
                ))}
            </CardContent>
        </Card>
    )
}
