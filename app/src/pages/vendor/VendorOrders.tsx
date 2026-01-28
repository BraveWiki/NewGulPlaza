// src/pages/vendor/VendorOrders.tsx
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Search, 
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  Package,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  updateDoc,
  doc,
  serverTimestamp,
  Unsubscribe 
} from 'firebase/firestore';
import { toast } from 'sonner';
import type { Order } from '@/types';

const statusFilters = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] as const;
type StatusFilter = typeof statusFilters[number];

export default function VendorOrders() {
  const navigate = useNavigate();
  const { shopId, isVendor } = useAuth();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect if not vendor
  useEffect(() => {
    if (!isVendor) {
      toast.error('Please login as a vendor');
      navigate('/vendor/login');
    }
  }, [isVendor, navigate]);

  // Real-time orders subscription
  useEffect(() => {
    if (!shopId) return;

    let unsubscribe: Unsubscribe | null = null;

    const setupSubscription = () => {
      const q = query(
        collection(db, 'orders'),
        where('shopId', '==', shopId)
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Order[];
        
        // Sort client-side by date
        ordersData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setOrders(ordersData);
        setLoading(false);
      }, (error) => {
        console.error('Orders subscription error:', error);
        toast.error('Failed to load orders');
        setLoading(false);
      });
    };

    setupSubscription();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [shopId]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || 
        order.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchQuery, statusFilter]);

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    inProgress: orders.filter(o => ['confirmed', 'shipped'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders
      .filter(o => o.status !== 'cancelled')
      .reduce((sum, o) => sum + o.amount, 0)
  }), [orders]);

  const handleStatusChange = useCallback(async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
      toast.success(`Order marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  }, []);

  const handleWhatsAppClick = useCallback((phone: string, order: Order) => {
    const message = `Assalamualaikum ${order.customer.name}!\n\nYour order *${order.id}* for *${order.product}* is ${order.status}.\n\nAmount: Rs ${order.amount.toLocaleString()}\n\nHow can I help you?`;
    window.open(`https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  }, []);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped': return <Truck className="w-5 h-5 text-blue-600" />;
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'pending': return <Clock className="
