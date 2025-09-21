'use client';

import { useState } from 'react';
import { useUser } from '@/context/user-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Flame, 
  ShieldCheck, 
  Swords, 
  Crown, 
  Badge as BadgeIconLucide,
  Calendar,
  TrendingUp,
  MessageCircle,
  ThumbsUp,
  Award,
  Target,
  BarChart3
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { Post, TrendingItem, QuizQuestion } from '@/lib/types';

const badgeIcons: { [key: string]: LucideIcon } = {
  ShieldCheck,
  Swords,
  Crown,
  BadgeIcon: BadgeIconLucide,
};

// Mock user activity data
const mockUserActivity = {
  totalClaims: 24,
  verifiedClaims: 18,
  debunkedClaims: 6,
  communityPosts: 12,
  comments: 45,
  quizAttempts: 8,
  correctAnswers: 32,
  totalQuestions: 40,
  weeklyActivity: [4, 6, 3, 8, 5, 7, 9], // Last 7 days
  monthlyPoints: [120, 150, 180, 200, 220, 250, 280, 300, 320, 350, 380, 400], // Last 12 months
};

// Mock user's posts and activity (will be replaced with API calls)
const mockUserPosts: Post[] = [];
const mockUserTrending: TrendingItem[] = [];
const mockRecentQuiz: QuizQuestion[] = [];

export default function ProfilePage() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('overview');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Please log in to view your profile</h2>
              <p className="text-muted-foreground">You need to be logged in to access your profile page.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const accuracyRate = Math.round((mockUserActivity.correctAnswers / mockUserActivity.totalQuestions) * 100);
  const nextLevelPoints = Math.ceil(user.points / 500) * 500;
  const progressToNextLevel = ((user.points % 500) / 500) * 100;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="text-2xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={user.role === 'admin' ? 'default' : user.role === 'moderator' ? 'secondary' : 'outline'}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Member since Jan 2024</span>
                  </div>
                </div>
                
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              </div>
              
              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary mb-1">
                    <Trophy className="h-6 w-6" />
                    {user.points}
                  </div>
                  <p className="text-sm text-muted-foreground">Points</p>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-2xl font-bold text-orange-500 mb-1">
                    <Flame className="h-6 w-6" />
                    {user.streak}
                  </div>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500 mb-1">
                    {accuracyRate}%
                  </div>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500 mb-1">
                    {mockUserActivity.totalClaims}
                  </div>
                  <p className="text-sm text-muted-foreground">Claims Verified</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Badges Section */}
          <div className="mt-6 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-4">Achievements</h3>
            <div className="flex flex-wrap gap-3">
              {user.badges.map((badge) => {
                const Icon = badgeIcons[badge.icon];
                return (
                  <div key={badge.name} className="flex items-center gap-2 bg-secondary/50 px-4 py-2 rounded-lg">
                    {Icon && <Icon className={`h-5 w-5 ${badge.color}`} />}
                    <span className="font-medium">{badge.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress to Next Level */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Progress to Next Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Current Level: {Math.floor(user.points / 500) + 1}</span>
              <span>{user.points} / {nextLevelPoints} points</span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {nextLevelPoints - user.points} more points to reach the next level
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Section */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="posts">My Posts</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Weekly Activity Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {mockUserActivity.weeklyActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="text-sm w-16">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                      </span>
                      <div className="flex-1 bg-secondary rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(activity / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground w-8">{activity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Verified a claim about climate change</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                    <Badge variant="outline">+25 points</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Completed daily quiz</p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                    <Badge variant="outline">+50 points</Badge>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-500 rounded-full" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Posted in community</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    <Badge variant="outline">+10 points</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Total Claims</span>
                  <span className="font-semibold">{mockUserActivity.totalClaims}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Verified</span>
                  <span className="font-semibold text-green-500">{mockUserActivity.verifiedClaims}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Debunked</span>
                  <span className="font-semibold text-red-500">{mockUserActivity.debunkedClaims}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Accuracy Rate</span>
                  <span className="font-semibold text-blue-500">{accuracyRate}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Posts Created</span>
                  <span className="font-semibold">{mockUserActivity.communityPosts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Comments Made</span>
                  <span className="font-semibold">{mockUserActivity.comments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Votes</span>
                  <span className="font-semibold">1,234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Helpful Votes</span>
                  <span className="font-semibold text-green-500">987</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quiz Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm">Quiz Attempts</span>
                  <span className="font-semibold">{mockUserActivity.quizAttempts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Correct Answers</span>
                  <span className="font-semibold text-green-500">{mockUserActivity.correctAnswers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Total Questions</span>
                  <span className="font-semibold">{mockUserActivity.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Success Rate</span>
                  <span className="font-semibold text-blue-500">{accuracyRate}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Posts Tab */}
        <TabsContent value="posts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                My Community Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockUserPosts.length > 0 ? (
                <div className="space-y-4">
                  {mockUserPosts.map((post) => (
                    <div key={post.post_id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium">{post.content}</h4>
                        <span className="text-sm text-muted-foreground">{post.createdAt}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {post.votes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments.length}
                        </div>
                        <div className="flex gap-1">
                          {post.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No posts yet. Start contributing to the community!</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Current Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.badges.map((badge) => {
                    const Icon = badgeIcons[badge.icon];
                    return (
                      <div key={badge.name} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                        {Icon && <Icon className={`h-6 w-6 ${badge.color}`} />}
                        <div>
                          <p className="font-medium">{badge.name}</p>
                          <p className="text-sm text-muted-foreground">Earned through community participation</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Available Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <div>
                      <p className="font-medium">Quiz Master</p>
                      <p className="text-sm text-muted-foreground">Complete 50 quiz questions correctly</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <Flame className="h-6 w-6 text-orange-500" />
                    <div>
                      <p className="font-medium">Streak Master</p>
                      <p className="text-sm text-muted-foreground">Maintain a 30-day streak</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border rounded-lg opacity-50">
                    <MessageCircle className="h-6 w-6 text-blue-500" />
                    <div>
                      <p className="font-medium">Community Helper</p>
                      <p className="text-sm text-muted-foreground">Make 100 helpful comments</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
