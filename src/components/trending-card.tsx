
import { TrendingItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, XCircle, Tag, BarChart } from 'lucide-react';

interface TrendingCardProps {
    item: TrendingItem;
}

export function TrendingCard({ item }: TrendingCardProps) {
    const isDebunked = item.status === 'debunked';
    
    return (
        <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-lg leading-tight pr-4">{item.claim}</CardTitle>
                    {isDebunked ? (
                        <XCircle className="h-8 w-8 text-red-500 flex-shrink-0" />
                    ) : (
                        <CheckCircle2 className="h-8 w-8 text-green-500 flex-shrink-0" />
                    )}
                </div>
                <CardDescription className="flex items-center gap-2 pt-2">
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{item.engagement}k</span>
                    <span>engagements</span>
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-base border-l-4 border-primary pl-4 py-2 bg-secondary/50 rounded-r-md">
                    {item.proof_snippet}
                </p>
            </CardContent>
            <CardFooter>
                <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="font-normal">
                            <Tag className="w-3 h-3 mr-1.5" />
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardFooter>
        </Card>
    );
}
