'use client';

import { useState, useMemo, useEffect } from 'react';
import { Users, Search, Tag, Megaphone, ShieldCheck, Plus, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ClaimCard } from '@/components/claim-card';
import { DiscussionPostCard } from '@/components/discussion-post-card';
import { CreatePostDialog } from '@/components/create-post-dialog';
import { mockClaims } from '@/lib/mock-data';
import { apiClient } from '@/lib/api-client';
import type { VerifiedClaim, Post } from '@/lib/types';
import { useUser } from '@/context/user-context';


export default function CommunityPage() {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('claims');
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const result = await apiClient.getPosts();
        if (result.success && result.data) {
          setPosts(result.data);
        } else {
          setError(result.error || 'Failed to load posts');
        }
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  const allClaimTags = useMemo(() => {
    const tags = new Set<string>();
    mockClaims.forEach(item => item.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const allDiscussionTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(item => item.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [posts]);

  const filteredClaims = useMemo(() => {
    return mockClaims.filter(claim => {
      const tagMatch = selectedTag ? claim.tags.includes(selectedTag) : true;
      const searchMatch = searchTerm ? claim.claim.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return tagMatch && searchMatch;
    });
  }, [selectedTag, searchTerm]);

  const filteredDiscussions = useMemo(() => {
    return posts.filter(post => {
      const tagMatch = selectedTag ? post.tags.includes(selectedTag) : true;
      const searchMatch = searchTerm ? post.content.toLowerCase().includes(searchTerm.toLowerCase()) : true;
      return tagMatch && searchMatch;
    });
  }, [posts, selectedTag, searchTerm]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSelectedTag(null);
    setSearchTerm('');
  }

  const handlePostSubmit = async (newPost: { content: string; tags: string }) => {
    if (!user) return;
    
    try {
      const result = await apiClient.createPost({
        content: newPost.content,
        tags: newPost.tags.split(',').map(tag => tag.trim()),
        userId: user.id
      });
      
      if (result.success && result.data) {
        setPosts(prev => [result.data!, ...prev]);
        setCreatePostOpen(false);
      } else {
        setError(result.error || 'Failed to create post');
      }
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const renderTagFilters = (tags: string[]) => (
    <div className="flex flex-wrap items-center justify-center gap-2">
        <Button
            variant={!selectedTag ? 'default' : 'outline'}
            onClick={() => setSelectedTag(null)}
            className="rounded-full"
        >
            All
        </Button>
        {tags.map(tag => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            onClick={() => setSelectedTag(tag)}
            className="rounded-full capitalize"
          >
            <Tag className="w-4 h-4 mr-2" />
            {tag}
          </Button>
        ))}
      </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 relative">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-headline flex items-center justify-center gap-3">
          <Users className="w-10 h-10 text-primary" />
          Community Hub
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore verified claims from our moderators and engage in discussions with the community.
        </p>
      </header>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-lg mx-auto h-12">
          <TabsTrigger value="claims" className="h-10 text-base">
            <ShieldCheck className="mr-2" /> Verified Claims
            </TabsTrigger>
          <TabsTrigger value="discussions" className="h-10 text-base">
            <Megaphone className="mr-2" /> Discussions
            </TabsTrigger>
        </TabsList>
        
        <div className="my-8 space-y-6">
            <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search by keyword..." 
                    className="pl-10 h-12 text-base"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>


        <TabsContent value="claims">
            <div className="mb-8">
              {renderTagFilters(allClaimTags)}
            </div>
            <main className="max-w-4xl mx-auto space-y-8">
                {filteredClaims.map((claim) => (
                <ClaimCard key={claim.id} claim={claim} />
                ))}
            </main>
        </TabsContent>

        <TabsContent value="discussions">
            <div className="mb-8">
              {renderTagFilters(allDiscussionTags)}
            </div>
            <main className="max-w-4xl mx-auto space-y-8">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Loading discussions...</span>
                </div>
              ) : error ? (
                <div className="text-center py-12 text-red-500">
                  <p>Error: {error}</p>
                  <Button 
                    onClick={() => window.location.reload()} 
                    className="mt-4"
                    variant="outline"
                  >
                    Retry
                  </Button>
                </div>
              ) : filteredDiscussions.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Megaphone className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No discussions found. Be the first to start a conversation!</p>
                </div>
              ) : (
                filteredDiscussions.map((post) => (
                  <DiscussionPostCard key={post.post_id} post={post} />
                ))
              )}
            </main>
        </TabsContent>
      </Tabs>
      
      {activeTab === 'discussions' && user && (
         <div className="fixed bottom-8 right-8">
            <Button
              size="icon"
              className="rounded-full w-16 h-16 shadow-lg"
              onClick={() => setCreatePostOpen(true)}
            >
              <Plus className="w-8 h-8" />
            </Button>
          </div>
      )}
      <CreatePostDialog
        open={isCreatePostOpen}
        onOpenChange={setCreatePostOpen}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
}
