// src/hooks/useStories.ts
import { useState, useEffect } from 'react';
import { storyService } from '@/services/storyService';
import type { Story } from '@/types';

export const useStories = (limitCount?: number) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await storyService.getStories(limitCount);
        setStories(data);
      } catch (err) {
        setError('Failed to fetch stories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, [limitCount]);

  return { stories, loading, error };
};
