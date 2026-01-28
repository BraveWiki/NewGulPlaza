// src/services/orderService.ts
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Order } from '@/types';

const ORDERS_COLLECTION = 'orders';

export const orderService = {
  // Get orders for a shop
  async getOrdersByShop(shopId: string, status?: string): Promise<Order[]> {
    let q = query(
      collection(db, ORDERS_COLLECTION),
      where('shopId', '==', shopId),
      orderBy('createdAt', 'desc')
    );
    
    if (status && status !== 'All') {
      q = query(q, where('status', '==', status.toLowerCase()));
    }
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  },

  // Get orders by customer phone
  async getOrdersByCustomer(phone: string): Promise<Order[]> {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('customer.phone', '==', phone),
      orderBy('createdAt', 'desc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
  },

  // Create order
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), {
      ...orderData,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  },

  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    const docRef = doc(db, ORDERS_COLLECTION, orderId);
    await updateDoc(docRef, {
      status,
      updatedAt: serverTimestamp()
    });
  },

  // Get order statistics for a shop
  async getOrderStats(shopId: string) {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('shopId', '==', shopId)
    );
    
    const snapshot = await getDocs(q);
    const orders = snapshot.docs.map(doc => doc.data() as Order);
    
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'pending').length,
      inProgress: orders.filter(o => ['confirmed', 'shipped'].includes(o.status)).length,
      delivered: orders.filter(o => o.status === 'delivered').length,
      cancelled: orders.filter(o => o.status === 'cancelled').length,
      revenue: orders
        .filter(o => o.status !== 'cancelled')
        .reduce((sum, o) => sum + o.amount, 0)
    };
  }
};
