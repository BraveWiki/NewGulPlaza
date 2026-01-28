// src/pages/VendorDashboard.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useOrders } from '@/hooks/useOrders';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

const navItems = [
  { path: '/vendor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/vendor/products', label: 'Products', icon: Package },
  { path: '/vendor/orders', label: 'Orders', icon: ShoppingCart },
  { path: '/vendor/profile', label: 'Profile', icon: User },
];

export default function VendorDashboard() {
  const { logout, shopId, currentUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState('');

const { orders, stats, loading: ordersLoading } = useOrders(shopId || '');
  const { products, loading: productsLoading } = useProducts({ 
    shopId: shopId || '',
    limit: 3
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  const getStatusIcon = (status: string) => {
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
  };

  const getStatusClass = (status: string) => {
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
  };

  if (!shopId) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-[#D93A3A]" />
          <p>Loading your shop...</p>
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
            <p className="font-semibold">{currentUser?.displayName || 'My Shop'}</p>
          </div>
        </aside>

        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8">
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-[#111111] mb-2">
              {greeting}, {currentUser?.displayName?.split(' ')[0] || 'Vendor'}! 👋
            </h1>
            <p className="text-[#6E6A63]">
              Here's how your shop is performing today
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard 
              icon={Eye} 
              label="Total Views" 
              value={stats.total * 12} // Simulated based on orders
              trend="+12%"
            />
            <StatCard 
              icon={ShoppingCart} 
              label="Total Orders" 
              value={stats.total}
              trend="+8%"
            />
            <StatCard 
              icon={TrendingUp} 
              label="Conversion Rate" 
              value="4.2%"
              trend="+2.3%"
            />
            <StatCard 
              icon={DollarSign} 
              label="Total Revenue" 
              value={`Rs ${stats.revenue.toLocaleString()}`}
              trend="+15%"
            />
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

                {ordersLoading ? (
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full" />
                    ))}
                  </div>
                ) : orders.length === 0 ? (
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
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#6E6A63]">Customer</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#6E6A63]">Amount</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-[#6E6A63]">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.id} className="border-b border-[#111111]/5 hover:bg-[#111111]/5">
                            <td className="py-3 px-4 text-sm font-medium text-[#111111]">{order.id}</td>
                            <td className="py-3 px-4 text-sm text-[#111111]">{order.product}</td>
                            <td className="py-3 px-4 text-sm text-[#6E6A63]">{order.customer.name}</td>
                            <td className="py-3 px-4 text-sm font-medium text-[#111111]">Rs {order.amount.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(order.status)}`}>
                                {getStatusIcon(order.status)}
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
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
                  <h2 className="text-xl font-bold text-[#111111]">Your Products</h2>
                  <Link to="/vendor/products">
                    <Button variant="ghost" className="text-[#D93A3A] hover:text-[#C43333]">
                      Manage
                    </Button>
                  </Link>
                </div>

                {productsLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <Skeleton key={i} className="h-20 w-full" />
                    ))}
                  </div>
                ) : products.length === 0 ? (
                  <div className="text-center py-8 text-[#6E6A63]">
                    No products yet. Add your first product!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {products.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-4 bg-white rounded-xl">
                        <div>
                          <p className="font-medium text-[#111111] mb-1">{product.name}</p>
                          <div className="flex items-center gap-4 text-sm text-[#6E6A63]">
                            <span className="flex items-center gap-1">
                              <Eye className="w-3 h-3" />
                              {product.views}
                            </span>
                            <span className="flex items-center gap-1">
                              <ShoppingCart className="w-3 h-3" />
                              {product.orders}
                            </span>
                          </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-[#D93A3A]/10 flex items-center justify-center">
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
              <Link to="/vendor/products">
                <div className="paper-card p-6 hover:-translate-y-1 transition-transform cursor-pointer">
                  <Package className="w-8 h-8 text-[#D93A3A] mb-4" />
                  <p className="font-semibold text-[#111111]">Add Product</p>
                  <p className="text-sm text-[#6E6A63]">List a new item</p>
                </div>
              </Link>
              <Link to="/vendor/orders">
                <div className="paper-card p-6 hover:-translate-y-1 transition-transform cursor-pointer">
                  <ShoppingCart className="w-8 h-8 text-[#D93A3A] mb-4" />
                  <p className="font-semibold text-[#111111]">View Orders</p>
                  <p className="text-sm text-[#6E6A63]">Manage pending orders</p>
                </div>
              </Link>
              <Link to="/vendor/profile">
                <div className="paper-card p-6 hover:-translate-y-1 transition-transform cursor-pointer">
                  <User className="w-8 h-8 text-[#D93A3A] mb-4" />
                  <p className="font-semibold text-[#111111]">Edit Profile</p>
                  <p className="text-sm text-[#6E6A63]">Update shop details</p>
                </div>
              </Link>
              <Link to={`/shop/${shopId}`} target="_blank">
                <div className="paper-card p-6 hover:-translate-y-1 transition-transform cursor-pointer">
                  <Store className="w-8 h-8 text-[#D93A3A] mb-4" />
                  <p className="font-semibold text-[#111111]">View Shop</p>
                  <p className="text-sm text-[#6E6A63]">See public profile</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, trend }: { 
  icon: any; 
  label: string; 
  value: string | number;
  trend: string;
}) {
  return (
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
}
