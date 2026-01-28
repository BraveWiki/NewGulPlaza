// src/pages/vendor/VendorDashboard.tsx
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  User, 
  TrendingUp, 
  Eye, 
  DollarSign,
  ArrowRight,
  Store,
  LogOut,
  Menu,
  X,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { collection, query, where, orderBy, limit, getDocs, onSnapshot, Unsubscribe } from 'firebase/firestore';
import { toast } from 'sonner';
import type { Order, Product } from '@/types';

interface DashboardStats {
  views: number;
  orders: number;
  conversion: number;
  revenue: number;
}

const navItems = [
  { path: '/vendor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/vendor/products', label: 'Products', icon: Package },
  { path: '/vendor/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/vendor/profile', label: 'Profile', icon: User },
];

export default function VendorDashboard() {
  const navigate = useNavigate();
  const { logout, shopId, currentUser, isVendor, loading: authLoading } = useAuth();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [stats, setStats] = useState<DashboardStats>({
    views: 0,
    orders: 0,
    conversion: 0,
    revenue: 0
  });
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  // Redirect if not vendor
  useEffect(() => {
    if (!authLoading && !isVendor) {
      toast.error('Please login as a vendor');
      navigate('/vendor/login');
    }
  }, [authLoading, isVendor, navigate]);

  // Fetch dashboard data with real-time updates
  useEffect(() => {
    if (!shopId) return;

    let unsubOrders: Unsubscribe | null = null;
    let unsubProducts: Unsubscribe | null = null;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simple query without composite index - just filter by shopId
        const ordersQuery = query(
          collection(db, 'orders'),
          where('shopId', '==', shopId),
          limit(5)
        );

        // Use onSnapshot for real-time updates
        unsubOrders = onSnapshot(ordersQuery, (snapshot) => {
          const orders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Order[];
          
          // Sort client-side to avoid index requirement
          orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
          setRecentOrders(orders);
          
          // Calculate stats
          const totalRevenue
