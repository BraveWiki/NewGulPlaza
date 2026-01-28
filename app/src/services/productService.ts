// src/services/productService.ts
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
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Product } from '@/types';

const PRODUCTS_COLLECTION = 'products';

export const productService = {
  // Get all products with optional filters
  async getProducts(filters?: {
    shopId?: string;
    category?: string;
    available?: boolean;
    search?: string;
    limit?: number;
  }): Promise<Product[]> {
    let q = query(collection(db, PRODUCTS_COLLECTION), orderBy('createdAt', 'desc'));
    
    if (filters?.shopId) {
      q = query(q, where('shopId', '==', filters.shopId));
    }
    
    if (filters?.category && filters.category !== 'All') {
      q = query(q, where('category', '==', filters.category));
    }
    
    if (filters?.available) {
      q = query(q, where('isAvailable', '==', true));
    }
    
    if (filters?.limit) {
      q = query(q, limit(filters.limit));
    }

    const snapshot = await getDocs(q);
    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Product[];

    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchLower)
      );
    }

    return products;
  },

  // Get single product by ID
  async getProductById(productId: string): Promise<Product | null> {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return null;
  },

  // Get related products (same shop, excluding current)
  async getRelatedProducts(shopId: string, excludeProductId: string, limitCount: number = 4): Promise<Product[]> {
    const q = query(
      collection(db, PRODUCTS_COLLECTION),
      where('shopId', '==', shopId),
      where('isAvailable', '==', true),
      limit(limitCount + 1)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs
      .filter(doc => doc.id !== excludeProductId)
      .slice(0, limitCount)
      .map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
  },

  // Create product
  async createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'views' | 'orders'>): Promise<string> {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), {
      ...productData,
      views: 0,
      orders: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  },

  // Update product
  async updateProduct(productId: string, updates: Partial<Product>): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp()
    });
  },

  // Delete product
  async deleteProduct(productId: string): Promise<void> {
    await deleteDoc(doc(db, PRODUCTS_COLLECTION, productId));
  },

  // Increment views
  async incrementViews(productId: string): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(docRef, {
      views: increment(1)
    });
  },

  // Increment orders
  async incrementOrders(productId: string): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLLECTION, productId);
    await updateDoc(docRef, {
      orders: increment(1)
    });
  }
};
