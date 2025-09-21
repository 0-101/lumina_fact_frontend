'use client';
import { useState, useMemo } from 'react';
import { TrendingUp, Tag } from 'lucide-react';
import { TrendingCard } from '@/components/trending-card';
import { mockTrending } from '@/lib/mock-data';
import type { TrendingItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function TrendingPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    mockTrending.forEach(item => item.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, []);

  const filteredItems = useMemo(() => {
    if (!selectedTag) return mockTrending;
    return mockTrending.filter(item => item.tags.includes(selectedTag));
  }, [selectedTag]);

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
        {filteredItems.map((item) => (
          <TrendingCard key={item.id} item={item} />
        ))}
      </main>
    </div>
  );
}
