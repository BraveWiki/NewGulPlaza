// src/hooks/useOrders.ts
import { useState, useEffect, useCallback } from 'react';
import { orderService } from '@/services/orderService';
import type { Order } from '@/types';

export const useOrders = (shopId: string, status?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    delivered: 0,
    cancelled: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    if (!shopId) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const [ordersData, statsData] = await Promise.all([
        orderService.getOrdersByShop(shopId, status),
        orderService.getOrderStats(shopId)
      ]);
      
      setOrders(ordersData);
      setStats(statsData);
    } catch (err) {
      setError('Failed to fetch orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [shopId, status]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await orderService.updateOrderStatus(orderId, newStatus);
      setOrders(prev => prev.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
      await fetchOrders(); // Refresh stats
    } catch (err) {
      console.error('Failed to update order status:', err);
      throw err;
    }
  };

  return { orders, stats, loading, error, refetch: fetchOrders, updateOrderStatus };
};
