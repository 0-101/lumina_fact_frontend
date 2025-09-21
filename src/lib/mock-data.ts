import { User, Post, TrendingItem, QuizQuestion, Badge, VerifiedClaim } from './types';

export const badges: { [key: string]: Badge } = {
  'fact-finder': { name: 'Fact Finder', icon: 'ShieldCheck', color: 'text-blue-500' },
  'myth-buster': { name: 'Myth Buster', icon: 'Swords', color: 'text-red-500' },
  'community-king': { name: 'Community King', icon: 'Crown', color: 'text-yellow-500' },
  'rookie': { name: 'Rookie', icon: 'BadgeIcon', color: 'text-green-500' },
};

export const mockUsers: User[] = [
  { id: 'user1', name: 'Alice', avatarUrl: 'https://i.pravatar.cc/150?u=user1', points: 1250, streak: 12, badges: [badges['fact-finder'], badges['community-king']], role: 'admin' as const },
  { id: 'user2', name: 'Bob', avatarUrl: 'https://i.pravatar.cc/150?u=user2', points: 800, streak: 5, badges: [badges['myth-buster']], role: 'moderator' as const },
  { id: 'user3', name: 'Charlie', avatarUrl: 'https://i.pravatar.cc/150?u=user3', points: 350, streak: 2, badges: [badges['rookie']], role: 'user' as const },
  { id: 'user4', name: 'Diana', avatarUrl: 'https://i.pravatar.cc/150?u=user4', points: 1500, streak: 20, badges: [badges['fact-finder'], badges['myth-buster'], badges['community-king']], role: 'user' as const },
];

export const mockLeaderboard: User[] = [
    ...mockUsers,
    { id: 'user5', name: 'Eve', avatarUrl: 'https://i.pravatar.cc/150?u=user5', points: 1100, streak: 8, badges: [badges['fact-finder']], role: 'user' as const },
    { id: 'user6', name: 'Frank', avatarUrl: 'https://i.pravatar.cc/150?u=user6', points: 950, streak: 15, badges: [badges['myth-buster']], role: 'user' as const },
  ].sort((a, b) => b.points - a.points);


export const mockPosts: Post[] = [
  {
    post_id: '1',
    user: mockUsers[0],
    content: "Is it true that you only use 10% of your brain? I saw a movie about it.",
    tags: ['health', 'science'],
    votes: 15,
    createdAt: "2 days ago",
    comments: [
      { id: 'c1', user: mockUsers[1], text: "That's a common myth! Neurologists confirm we use virtually all of our brain every day." },
      { id: 'c2', user: mockUsers[2], text: "Yeah, I heard that too. The movie was 'Lucy' right?" },
    ],
  },
  {
    post_id: '2',
    user: mockUsers[2],
    content: "There's a new cryptocurrency that promises 100x returns in a month. Is this a scam?",
    tags: ['finance', 'crypto'],
    votes: 28,
    createdAt: "5 hours ago",
    comments: [
        { id: 'c3', user: mockUsers[3], text: "If it sounds too good to be true, it probably is. Be very careful with those promises." },
    ],
  },
    {
    post_id: '3',
    user: mockUsers[1],
    content: "Did a politician really say they would ban all video games? Seeing screenshots everywhere.",
    tags: ['politics', 'gaming'],
    votes: 8,
    createdAt: "1 week ago",
    comments: [],
  },
];

export const mockTrending: TrendingItem[] = [
    { id: 't1', claim: 'Drinking celery juice every morning cures all diseases.', engagement: 12.5, status: 'debunked', proof_snippet: 'Medical experts state that while celery juice is healthy, it is not a cure-all...', tags: ['health', 'diet'] },
    { id: 't2', claim: 'A new solar-powered car can run indefinitely without charging.', engagement: 9.8, status: 'debunked', proof_snippet: 'The technology shown in the viral video does not exist at a commercial level and violates laws of thermodynamics...', tags: ['tech', 'energy'] },
    { id: 't3', claim: 'The government is secretly adding mind-control agents to tap water.', engagement: 7.2, status: 'debunked', proof_snippet: 'This is a long-standing conspiracy theory with no scientific evidence...', tags: ['politics', 'conspiracy'] },
    { id: 't4', claim: 'You can charge your phone by putting it in the microwave for 30 seconds.', engagement: 15.1, status: 'debunked', proof_snippet: 'This is extremely dangerous and will destroy your phone and microwave. It is a harmful prank.', tags: ['tech', 'danger'] },
];

export const mockQuiz: QuizQuestion[] = [
    {
        id: 'q1',
        question: "What is a 'deepfake'?",
        options: ['A type of coffee', 'AI-generated video or audio of a person', 'A very sad song', 'An underwater cave'],
        correctAnswer: 'AI-generated video or audio of a person',
        points: 50,
    },
    {
        id: 'q2',
        question: "Which of these is a common sign of a phishing email?",
        options: ['A generic greeting like "Dear Customer"', 'Urgent requests for personal information', 'Spelling and grammar mistakes', 'All of the above'],
        correctAnswer: 'All of the above',
        points: 50,
    },
    {
        id: 'q3',
        question: "What does 'confirmation bias' mean?",
        options: ['The tendency to search for and favor information that confirms one\'s existing beliefs', 'Being sure you received a confirmation email', 'A bias against new technology', 'Checking facts multiple times'],
        correctAnswer: 'The tendency to search for and favor information that confirms one\'s existing beliefs',
        points: 50,
    },
];

export const mockClaims: VerifiedClaim[] = [
  {
    id: 'vc1',
    claim: 'The Great Wall of China is the only man-made object visible from space.',
    status: 'debunked',
    proof: 'Astronauts have confirmed that the Great Wall is not visible from low Earth orbit without aid. City lights, however, are.',
    moderator: mockUsers[1],
    upvotes: 128,
    downvotes: 5,
    tags: ['history', 'space'],
    createdAt: '3 days ago'
  },
  {
    id: 'vc2',
    claim: 'Goldfish have a three-second memory.',
    status: 'debunked',
    proof: 'Studies have shown that goldfish memory can last for several months. They can be trained to respond to light and sound cues.',
    moderator: mockUsers[0],
    upvotes: 95,
    downvotes: 2,
    tags: ['animals', 'science'],
    createdAt: '1 day ago'
  },
    {
    id: 'vc3',
    claim: 'Shaving hair makes it grow back thicker and darker.',
    status: 'debunked',
    proof: 'Shaving cuts hair at the blunt end of the shaft, which can make it feel coarser as it grows out, but it doesn\'t change its thickness or color.',
    moderator: mockUsers[1],
    upvotes: 210,
    downvotes: 12,
    tags: ['health', 'myth'],
    createdAt: '1 week ago'
  },
];
