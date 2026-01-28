// src/services/shopService.ts
import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  startAfter,
  DocumentSnapshot,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Shop } from '@/types';

const SHOPS_COLLECTION = 'shops';

export const shopService = {
  // Get all shops with optional filters
  async getShops(filters?: {
    category?: string;
    city?: string;
    featured?: boolean;
    verified?: boolean;
    search?: string;
    limit?: number;
  }): Promise<Shop[]> {
    let q = query(collection(db, SHOPS_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (filters?.category && filters.category !== 'All') {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters?.city && filters.city !== 'All') {
      q = query(q, where('city', '==', filters.city));
    }
    
    if (filters?.featured) {
      q = query(q, where('isFeatured', '==', true));
    }
    
    if (filters?.verified) {
      q = query(q, where('isVerified', '==', true));
    }
    
    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }

    const snapshot = await getDocs(q);
    let shops = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Shop[];

    // Client-side search for name/description
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      shops = shops.filter(shop => 
        shop.name.toLowerCase().includes(searchLower) ||
        shop.description.toLowerCase().includes(searchLower)
      );
    }

    return shops;
  },

  // Get single shop by ID
  async getShopById(shopId: string): Promise<Shop | null> {
    const docRef = doc(db, SHOPS_COLLECTION, shopId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Shop;
    }
    return null;
  },

  // Get shop by user ID (for vendor dashboard)
  async getShopByUserId(userId: string): Promise<Shop | null> {
    const q = query(
      collection(db, SHOPS_COLLECTION), 
      where('userId', '==', userId),
      limit(1)
    );
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as Shop;
    }
    return null;
  },

  // Create new shop
  async createShop(shopData: Omit<Shop, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, SHOPS_COLLECTION), {
      ...shopData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      productsCount: 0,
      ordersCompleted: 0,
      rating: 0
    });
    return docRef.id;
  },

  // Update shop
  async updateShop(shopId: string, updates: Partial<Shop>): Promise<void> {
    const docRef = doc(db, SHOPS_COLLECTION, shopId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  // Increment products count
  async incrementProductsCount(shopId: string, delta: number = 1): Promise<void> {
    const docRef = doc(db, SHOPS_COLLECTION, shopId);
    await updateDoc(docRef, {
      productsCount: increment(delta),
      updatedAt: serverTimestamp()
    });
  },

  // Increment orders completed
  async incrementOrdersCompleted(shopId: string): Promise<void> {
    const docRef = doc(db, SHOPS_COLLECTION, shopId);
    await updateDoc(docRef, {
      ordersCompleted: increment(1),
      updatedAt: serverTimestamp()
    });
  }
};
