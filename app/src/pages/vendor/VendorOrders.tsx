import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

// Mock orders data
const initialOrders = [
  {
    id: 'ORD-001',
    product: 'Hand-embroidered Kurta',
    productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    customer: {
      name: 'Amina Rahman',
      phone: '+92-300-1234567',
      address: '123 Main Street, Gulberg',
      city: 'Lahore',
    },
    quantity: 2,
    amount: 4800,
    status: 'pending',
    date: '2024-01-26T10:30:00',
    notes: 'Please deliver after 5 PM',
  },
  {
    id: 'ORD-002',
    product: 'Traditional Scarf',
    productImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80',
    customer: {
      name: 'Bilal Qureshi',
      phone: '+92-301-2345678',
      address: '45 Garden Town',
      city: 'Lahore',
    },
    quantity: 1,
    amount: 1200,
    status: 'confirmed',
    date: '2024-01-25T14:20:00',
    notes: '',
  },
  {
    id: 'ORD-003',
    product: 'Stitched Cotton Suit',
    productImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    customer: {
      name: 'Fatima Khan',
      phone: '+92-302-3456789',
      address: '78 DHA Phase 5',
      city: 'Lahore',
    },
    quantity: 1,
    amount: 3500,
    status: 'shipped',
    date: '2024-01-24T09:15:00',
    notes: 'Gift wrap please',
  },
  {
    id: 'ORD-004',
    product: 'Embroidered Dupatta',
    productImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    customer: {
      name: 'Zara Malik',
      phone: '+92-303-4567890',
      address: '90 Model Town',
      city: 'Lahore',
    },
    quantity: 3,
    amount: 5400,
    status: 'delivered',
    date: '2024-01-23T16:45:00',
    notes: '',
  },
  {
    id: 'ORD-005',
    product: 'Hand-embroidered Kurta',
    productImage: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    customer: {
      name: 'Sana Ahmed',
      phone: '+92-304-5678901',
      address: '12 Johar Town',
      city: 'Lahore',
    },
    quantity: 1,
    amount: 2400,
    status: 'cancelled',
    date: '2024-01-22T11:00:00',
    notes: 'Customer cancelled',
  },
];

const statusFilters = ['All', 'Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];

export default function VendorOrders() {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'shipped':
        return <Truck className="w-5 h-5 text-blue-600" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-600" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'confirmed':
        return 'bg-blue-100 text-blue-700';
      case 'pending':
        return 'bg-amber-100 text-amber-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PK', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-PK', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleWhatsAppClick = (phone: string, order: any) => {
    const message = `
Assalamualaikum ${order.customer.name}!

This is regarding your order *${order.id}* for *${order.product}*.

Order Details:
- Amount: Rs ${order.amount.toLocaleString()}
- Status: ${order.status}

How can I help you today?
    `.trim();
    
    const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {/* Header */}
      <div className="bg-[#111111] text-white p-4 lg:p-6">
        <div className="flex items-center justify-between">
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
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-[#111111]">{orders.length}</p>
              <p className="text-sm text-[#6E6A63]">Total Orders</p>
            </div>
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-amber-600">
                {orders.filter(o => o.status === 'pending').length}
              </p>
              <p className="text-sm text-[#6E6A63]">Pending</p>
            </div>
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-blue-600">
                {orders.filter(o => o.status === 'confirmed' || o.status === 'shipped').length}
              </p>
              <p className="text-sm text-[#6E6A63]">In Progress</p>
            </div>
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-green-600">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
              <p className="text-sm text-[#6E6A63]">Delivered</p>
            </div>
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-[#111111]">
                Rs {orders.reduce((acc, o) => acc + o.amount, 0).toLocaleString()}
              </p>
              <p className="text-sm text-[#6E6A63]">Total Revenue</p>
            </div>
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
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="paper-card overflow-hidden">
                <div 
                  className="p-4 md:p-6 cursor-pointer"
                  onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img 
                        src={order.productImage} 
                        alt={order.product}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-[#111111]">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusClass(order.status)}`}>
                            {getStatusIcon(order.status)}
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-[#111111] font-medium">{order.product}</p>
                        <p className="text-sm text-[#6E6A63]">
                          {formatDate(order.date)} at {formatTime(order.date)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between md:justify-end gap-6">
                      <div className="text-right">
                        <p className="text-xl font-bold text-[#111111]">
                          Rs {order.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-[#6E6A63]">
                          Qty: {order.quantity}
                        </p>
                      </div>
                      <button className="p-2 hover:bg-[#111111]/5 rounded-lg transition-colors">
                        {expandedOrder === order.id ? (
                          <ChevronUp className="w-5 h-5 text-[#6E6A63]" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-[#6E6A63]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === order.id && (
                  <div className="border-t border-[#111111]/10 p-4 md:p-6 bg-[#111111]/5">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Customer Details */}
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
                            <p className="text-sm text-amber-800">
                              <strong>Note:</strong> {order.notes}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div>
                        <h4 className="font-semibold text-[#111111] mb-3">Actions</h4>
                        
                        {/* Status Update */}
                        <div className="mb-4">
                          <p className="text-sm text-[#6E6A63] mb-2">Update Status</p>
                          <div className="flex flex-wrap gap-2">
                            {['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'].map((status) => (
                              <button
                                key={status}
                                onClick={() => handleStatusChange(order.id, status)}
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

                        {/* Contact Buttons */}
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                            onClick={() => handleWhatsAppClick(order.customer.phone, order)}
                          >
                            <MessageCircle className="w-4 h-4" />
                            WhatsApp
                          </Button>
                          <Button 
                            variant="outline" 
                            className="flex-1 gap-2"
                            onClick={() => window.location.href = `tel:${order.customer.phone}`}
                          >
                            <Phone className="w-4 h-4" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-16">
              <ShoppingCart className="w-16 h-16 text-[#6E6A63]/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#111111] mb-2">
                No orders found
              </h3>
              <p className="text-[#6E6A63]">
                {searchQuery || statusFilter !== 'All' ? 'Try adjusting your filters' : 'Orders will appear here when customers place them'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
