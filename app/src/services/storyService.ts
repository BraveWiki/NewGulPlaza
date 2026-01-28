// src/services/storyService.ts
import { 
  collection, 
  getDocs, 
  query, 
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Story } from '@/types';

const STORIES_COLLECTION = 'stories';

export const storyService = {
  // Get all stories ordered by display order
  async getStories(limitCount?: number): Promise<Story[]> {
    let q = query(collection(db, STORIES_COLLECTION), orderBy('order', 'asc'));
    
    if (limitCount) {
      q = query(q, limit(limitCount));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Story[];
  },

  // Get featured story (first one)
  async getFeaturedStory(): Promise<Story | null> {
    const q = query(
      collection(db, STORIES_COLLECTION),
      orderBy('order', 'asc'),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Story;
    }
    return null;
  }
};
