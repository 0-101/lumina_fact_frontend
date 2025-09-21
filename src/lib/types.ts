export type Badge = {
  name: string;
  icon: string;
  color: string;
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
  points: number;
  streak: number;
  badges: Badge[];
  role: 'user' | 'moderator' | 'admin';
};

export type SourceContext = {
  source: string;
  snippet: string;
};

export type VerificationResult = {
  status: 'verified' | 'debunked' | 'partially-verified' | 'inconclusive';
  claim_type: 'static' | 'dynamic';
  analysis: string;
  source_context: SourceContext[];
  summary: string;
  disclaimer: string;
};

export type Comment = {
  id: string;
  user: Pick<User, 'id' | 'name' | 'avatarUrl' | 'badges'>;
  text: string;
};

export type Post = {
  post_id: string;
  user: Pick<User, 'id' | 'name' | 'avatarUrl' | 'badges'>;
  content: string;
  tags: string[];
  votes: number;
  comments: Comment[];
  createdAt: string;
};

export type TrendingItem = {
  id: string;
  claim: string;
  engagement: number;
  status: 'verified' | 'debunked';
  proof_snippet: string;
  tags: string[];
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  points: number;
};

export type VerifiedClaim = {
  id: string;
  claim: string;
  status: 'verified' | 'debunked';
  proof: string;
  moderator: Pick<User, 'id' | 'name' | 'avatarUrl'>;
  upvotes: number;
  downvotes: number;
  tags: string[];
  createdAt: string;
};
