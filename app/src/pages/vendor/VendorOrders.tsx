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
} from 'firebase/firestore';
import type { Unsubscribe } from 'firebase/firestore';
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
      case 'pending': return <Clock className="w-5 h-5 text-amber-600" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <Package className="w-5 h-5 text-gray-600" />;
    }
  }, []);

  const getStatusClass = useCallback((status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'confirmed': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-amber-100 text-amber-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-PK', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#D93A3A]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {/* Header */}
      <div className="bg-[#111111] text-white p-4 lg:p-6">
        <div className="flex items-center gap-4">
          <Link to="/vendor/dashboard">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-xl font-bold">Orders</h1>
            <p className="text-white/60 text-sm">Manage customer orders</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <StatCard value={stats.total} label="Total" />
            <StatCard value={stats.pending} label="Pending" color="amber" />
            <StatCard value={stats.inProgress} label="In Progress" color="blue" />
            <StatCard value={stats.delivered} label="Delivered" color="green" />
            <StatCard value={`Rs ${stats.revenue.toLocaleString()}`} label="Revenue" />
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
              <Input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-white border-[#111111]/10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    statusFilter === status
                      ? 'bg-[#111111] text-white'
                      : 'bg-white text-[#111111] hover:bg-[#111111]/5'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <EmptyState hasSearch={!!searchQuery || statusFilter !== 'All'} />
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isExpanded={expandedOrder === order.id}
                  onToggle={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  onStatusChange={handleStatusChange}
                  onWhatsAppClick={() => handleWhatsAppClick(order.customer.phone, order)}
                  getStatusIcon={getStatusIcon}
                  getStatusClass={getStatusClass}
                  formatDate={formatDate}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// Sub-components
const StatCard = ({ value, label, color }: { value: string | number; label: string; color?: string }) => (
  <div className="paper-card p-4">
    <p className={`text-2xl font-bold ${color ? `text-${color}-600` : 'text-[#111111]'}`}>
      {value}
    </p>
    <p className="text-sm text-[#6E6A63]">{label}</p>
  </div>
);

const EmptyState = ({ hasSearch }: { hasSearch: boolean }) => (
  <div className="text-center py-16">
    <ShoppingCart className="w-16 h-16 text-[#6E6A63]/30 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-[#111111] mb-2">No orders found</h3>
    <p className="text-[#6E6A63]">
      {hasSearch ? 'Try adjusting your filters' : 'Orders will appear here when customers place them'}
    </p>
  </div>
);

const OrderCard = ({ 
  order, 
  isExpanded, 
  onToggle, 
  onStatusChange, 
  onWhatsAppClick,
  getStatusIcon,
  getStatusClass,
  formatDate 
}: {
  order: Order;
  isExpanded: boolean;
  onToggle: () => void;
  onStatusChange: (id: string, status: Order['status']) => void;
  onWhatsAppClick: () => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusClass: (status: string) => string;
  formatDate: (date: string) => string;
}) => (
  <div className="paper-card overflow-hidden">
    <div className="p-4 md:p-6 cursor-pointer" onClick={onToggle}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={order.productImage} alt={order.product} className="w-16 h-16 rounded-lg object-cover" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-[#111111]">{order.id}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusClass(order.status)}`}>
                {getStatusIcon(order.status)}
                <span className="capitalize">{order.status}</span>
              </span>
            </div>
            <p className="text-[#111111] font-medium truncate">{order.product}</p>
            <p className="text-sm text-[#6E6A63]">{formatDate(order.date)}</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between md:justify-end gap-6">
          <div className="text-right">
            <p className="text-xl font-bold text-[#111111]">Rs {order.amount.toLocaleString()}</p>
            <p className="text-sm text-[#6E6A63]">Qty: {order.quantity}</p>
          </div>
          {isExpanded ? <ChevronUp className="w-5 h-5 text-[#6E6A63]" /> : <ChevronDown className="w-5 h-5 text-[#6E6A63]" />}
        </div>
      </div>
    </div>

    {isExpanded && (
      <div className="border-t border-[#111111]/10 p-4 md:p-6 bg-[#111111]/5">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-[#111111] mb-3">Customer Details</h4>
            <div className="space-y-2 text-sm">
              <p className="text-[#111111]"><strong>Name:</strong> {order.customer.name}</p>
              <p className="text-[#6E6A63]"><strong>Phone:</strong> {order.customer.phone}</p>
              <p className="text-[#6E6A63]"><strong>Address:</strong> {order.customer.address}</p>
              <p className="text-[#6E6A63]"><strong>City:</strong> {order.customer.city}</p>
            </div>
            
            {order.notes && (
              <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                <p className="text-sm text-amber-800"><strong>Note:</strong> {order.notes}</p>
              </div>
            )}
          </div>

          <div>
            <h4 className="font-semibold text-[#111111] mb-3">Actions</h4>
            
            <div className="mb-4">
              <p className="text-sm text-[#6E6A63] mb-2">Update Status</p>
              <div className="flex flex-wrap gap-2">
                {(['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => onStatusChange(order.id, status)}
                    disabled={order.status === status}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                      order.status === status
                        ? 'bg-[#111111] text-white'
                        : 'bg-white text-[#111111] hover:bg-[#111111]/5'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700" onClick={onWhatsAppClick}>
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
              <Button variant="outline" className="flex-1 gap-2" onClick={() => window.location.href = `tel:${order.customer.phone}`}>
                <Phone className="w-4 h-4" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
);
