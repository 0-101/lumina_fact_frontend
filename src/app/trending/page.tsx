'use client';
import { useState, useMemo, useEffect } from 'react';
import { TrendingUp, Tag, Loader2 } from 'lucide-react';
import { TrendingCard } from '@/components/trending-card';
import { apiClient } from '@/lib/api-client';
import type { TrendingItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TrendingPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [trendingItems, setTrendingItems] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load trending items on component mount
  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        const result = await apiClient.getTrending();
        if (result.success && result.data) {
          setTrendingItems(result.data);
        } else {
          setError(result.error || 'Failed to load trending items');
        }
      } catch (err) {
        setError('Failed to load trending items');
      } finally {
        setLoading(false);
      }
    };

    loadTrending();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    trendingItems.forEach(item => item.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [trendingItems]);

  const filteredItems = useMemo(() => {
    if (!selectedTag) return trendingItems;
    return trendingItems.filter(item => item.tags.includes(selectedTag));
  }, [trendingItems, selectedTag]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground font-headline flex items-center justify-center gap-3">
          <TrendingUp className="w-10 h-10 text-primary" />
          Trending Misinformation
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay informed about the most prevalent false narratives currently circulating online.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <Button
            variant={!selectedTag ? 'default' : 'outline'}
            onClick={() => setSelectedTag(null)}
            className="rounded-full"
        >
            All
        </Button>
        {allTags.map(tag => (
          <Button
            key={tag}
            variant={selectedTag === tag ? 'default' : 'outline'}
            onClick={() => setSelectedTag(tag)}
            className="rounded-full"
          >
            <Tag className="w-4 h-4 mr-2" />
            {tag.charAt(0).toUpperCase() + tag.slice(1)}
          </Button>
        ))}
      </div>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2">Loading trending items...</span>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-12 text-red-500">
            <p>Error: {error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
              variant="outline"
            >
              Retry
            </Button>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No trending items found.</p>
          </div>
        ) : (
          filteredItems.map((item) => (
            <TrendingCard key={item.id} item={item} />
          ))
        )}
      </main>
    </div>
  );
}
