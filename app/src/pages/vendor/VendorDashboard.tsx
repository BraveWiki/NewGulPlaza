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
          const totalRevenue = orders
            .filter(o => o.status !== 'cancelled')
            .reduce((sum, o) => sum + o.amount, 0);
          
          setStats(prev => ({
            ...prev,
            orders: orders.length,
            revenue: totalRevenue
          }));
        }, (err) => {
          console.error('Orders subscription error:', err);
          setError('Failed to load orders');
        });

        // Fetch products
        const productsQuery = query(
          collection(db, 'products'),
          where('shopId', '==', shopId),
          limit(3)
        );

        unsubProducts = onSnapshot(productsQuery, (snapshot) => {
          const products = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Product[];
          
          // Sort by orders client-side
          products.sort((a, b) => (b.orders || 0) - (a.orders || 0));
          
          setTopProducts(products);
          
          const totalViews = products.reduce((sum, p) => sum + (p.views || 0), 0);
          setStats(prev => ({
            ...prev,
            views: totalViews,
            conversion: totalViews > 0 ? Math.round((prev.orders / totalViews) * 1000) / 10 : 0
          }));
          
          setLoading(false);
        }, (err) => {
          console.error('Products subscription error:', err);
          setError('Failed to load products');
          setLoading(false);
        });

      } catch (err) {
        console.error('Dashboard fetch error:', err);
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      if (unsubOrders) unsubOrders();
      if (unsubProducts) unsubProducts();
    };
  }, [shopId]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to logout');
    }
  }, [logout, navigate]);

  const getStatusIcon = useCallback((status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'confirmed':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  }, []);

  const getStatusClass = useCallback((status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }, []);

  // Memoized stats cards to prevent re-renders
  const statsCards = useMemo(() => [
    { icon: Eye, label: 'Total Views', value: stats.views.toLocaleString(), trend: '+12%' },
    { icon: ShoppingCart, label: 'Total Orders', value: stats.orders.toString(), trend: '+8%' },
    { icon: TrendingUp, label: 'Conversion Rate', value: `${stats.conversion}%`, trend: '+2.3%' },
    { icon: DollarSign, label: 'Total Revenue', value: `Rs ${stats.revenue.toLocaleString()}`, trend: '+15%' },
  ], [stats]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#D93A3A]" />
          <span className="text-[#111111]">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center p-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {/* Mobile Header */}
      <div className="lg:hidden bg-[#111111] text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Store className="w-6 h-6 text-[#D93A3A]" />
          <span className="font-bold">GulPlaza Vendor</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-white/10 rounded-lg"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#111111] text-white transform transition-transform duration-300
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6">
            <Link to="/" className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-full bg-[#D93A3A] flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">GulPlaza</span>
            </Link>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    location.pathname === item.path
                      ? 'bg-[#D93A3A] text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all w-full mt-8"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
            <p className="text-white/50 text-sm mb-1">Your Shop</p>
            <p className="font-semibold truncate">{currentUser?.displayName || 'My Shop'}</p>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 overflow-hidden">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#111111] mb-2">
              {greeting}, {currentUser?.displayName?.split(' ')[0] || 'Vendor'}! 👋
            </h1>
            <p className="text-[#6E6A63]">
              Here's how your shop is performing
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statsCards.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <div className="lg:col-span-2">
              <div className="paper-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#111111]">Recent Orders</h2>
                  <Link to="/vendor/orders">
                    <Button variant="ghost" className="gap-2 text-[#D93A3A] hover:text-[#C43333]">
                      View All
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {recentOrders.length === 0 ? (
                  <div className="text-center py-8 text-[#6E6A63]">
                    No orders yet. They will appear here when customers place orders.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-[#111111]/10">
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#6E6A63]">Order ID</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#6E6A63]">Product</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#6E6A63] hidden md:table-cell">Customer</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#6E6A63]">Amount</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#6E6A63]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-[#111111]/5 hover:bg-[#111111]/5">
                            <td className="py-3 px-4 text-sm font-medium text-[#111111]">{order.id}</td>
                            <td className="py-3 px-4 text-sm text-[#111111]">{order.product}</td>
                            <td className="py-3 px-4 text-sm text-[#6E6A63] hidden md:table-cell">{order.customer.name}</td>
                            <td className="py-3 px-4 text-sm font-medium text-[#111111]">Rs {order.amount.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                                {getStatusIcon(order.status)}
                                <span className="capitalize">{order.status}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Top Products */}
            <div>
              <div className="paper-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-[#111111]">Top Products</h2>
                  <Link to="/vendor/products">
                    <Button variant="ghost" className="text-[#D93A3A] hover:text-[#C43333]">
                      Manage
                    </Button>
                  </Link>
                </div>

                {topProducts.length === 0 ? (
                  <div className="text-center py-8 text-[#6E6A63]">
                    No products yet. Add your first product!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-white rounded-xl">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-[#111111] mb-1 truncate">{product.name}</p>
                          <div className="flex items-center gap-4 text-sm text-[#6E6A63]">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {product.views || 0}
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingCart className="w-3 h-3" />
                              {product.orders || 0}
                            </span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#D93A3A]/10 flex items-center justify-center flex-shrink-0 ml-2">
                          <span className="text-[#D93A3A] font-bold text-sm">#{index + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Link to="/vendor/products">
                  <Button className="w-full btn-outline mt-6 gap-2">
                    <Package className="w-4 h-4" />
                    Add New Product
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-[#111111] mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <QuickActionCard 
                to="/vendor/products"
                icon={Package}
                title="Add Product"
                description="List a new item"
              />
              <QuickActionCard 
                to="/vendor/orders"
                icon={ShoppingCart}
                title="View Orders"
                description="Manage pending orders"
              />
              <QuickActionCard 
                to="/vendor/profile"
                icon={User}
                title="Edit Profile"
                description="Update shop details"
              />
              <QuickActionCard 
                to={`/shop/${shopId}`}
                icon={Store}
                title="View Shop"
                description="See public profile"
                external
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Memoized sub-components
const StatCard = ({ icon: Icon, label, value, trend }: { 
  icon: React.ElementType; 
  label: string; 
  value: string;
  trend: string;
}) => (
  <div className="paper-card p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-full bg-[#D93A3A]/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-[#D93A3A]" />
      </div>
      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
        {trend}
      </span>
    </div>
    <p className="text-3xl font-bold text-[#111111]">{value}</p>
    <p className="text-sm text-[#6E6A63]">{label}</p>
  </div>
);

const QuickActionCard = ({ to, icon: Icon, title, description, external }: {
  to: string;
  icon: React.ElementType;
  title: string;
  description: string;
  external?: boolean;
}) => (
  <Link 
    to={to} 
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
  >
    <div className="paper-card p-6 hover:-translate-y-1 transition-transform cursor-pointer h-full">
      <Icon className="w-8 h-8 text-[#D93A3A] mb-4" />
      <p className="font-semibold text-[#111111]">{title}</p>
      <p className="text-sm text-[#6E6A63]">{description}</p>
    </div>
  </Link>
);
