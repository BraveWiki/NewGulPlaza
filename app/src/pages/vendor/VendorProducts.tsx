// src/pages/vendor/VendorProducts.tsx
import { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/lib/firebase';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  doc,
  serverTimestamp,
  Unsubscribe 
} from 'firebase/firestore';
import type { Product } from '@/types';

const categories = ['Kurtas', 'Suits', 'Accessories', 'Fabrics', 'Bridal', 'Electronics', 'Food', 'Beauty', 'Other'];

export default function VendorProducts() {
  const navigate = useNavigate();
  const { shopId, currentUser, isVendor } = useAuth();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    category: '',
    image: '',
  });

  // Redirect if not vendor
  useEffect(() => {
    if (!isVendor) {
      toast.error('Please login as a vendor');
      navigate('/vendor/login');
    }
  }, [isVendor, navigate]);

  // Real-time products subscription
  useEffect(() => {
    if (!shopId) return;

    let unsubscribe: Unsubscribe | null = null;

    const setupSubscription = () => {
      const q = query(
        collection(db, 'products'),
        where('shopId', '==', shopId)
      );

      unsubscribe = onSnapshot(q, (snapshot) => {
        const productsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        
        // Sort client-side
        productsData.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
        
        setProducts(productsData);
        setLoading(false);
      }, (error) => {
        console.error('Products subscription error:', error);
        toast.error('Failed to load products');
        setLoading(false);
      });
    };

    setupSubscription();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [shopId]);

  const filteredProducts = useMemo(() => 
    products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [products, searchQuery]
  );

  const stats = useMemo(() => ({
    total: products.length,
    available: products.filter(p => p.isAvailable).length,
    lowStock: products.filter(p => p.stock <= 5 && p.stock > 0).length,
    totalOrders: products.reduce((acc, p) => acc + (p.orders || 0), 0)
  }), [products]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      name: '',
      description: '',
      price: '',
      originalPrice: '',
      stock: '',
      category: '',
      image: '',
    });
    setEditingProduct(null);
  }, []);

  const openAddDialog = useCallback(() => {
    resetForm();
    setIsDialogOpen(true);
  }, [resetForm]);

  const openEditDialog = useCallback((product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      stock: product.stock.toString(),
      category: product.category,
      image: product.image,
    });
    setIsDialogOpen(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shopId || !currentUser) {
      toast.error('Authentication required');
      return;
    }

    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseInt(formData.price),
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : null,
        stock: parseInt(formData.stock),
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
        shopId: shopId,
        shopName: currentUser.displayName || 'My Shop',
        isAvailable: parseInt(formData.stock) > 0,
        views: editingProduct?.views || 0,
        orders: editingProduct?.orders || 0,
        updatedAt: serverTimestamp()
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
        toast.success('Product updated successfully!');
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
        toast.success('Product added successfully!');
      }

      resetForm();
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', productId));
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    try {
      await updateDoc(doc(db, 'products', product.id), {
        isAvailable: !product.isAvailable,
        updatedAt: serverTimestamp()
      });
      toast.success(`Product ${product.isAvailable ? 'disabled' : 'enabled'}!`);
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/vendor/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Products</h1>
              <p className="text-white/60 text-sm">Manage your catalog</p>
            </div>
          </div>
          <Button 
            className="bg-[#D93A3A] hover:bg-[#C43333] gap-2"
            onClick={openAddDialog}
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Product</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Search */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 bg-white border-[#111111]/10"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard value={stats.total} label="Total Products" />
            <StatCard value={stats.available} label="Available" color="green" />
            <StatCard value={stats.lowStock} label="Low Stock" color="amber" />
            <StatCard value={stats.totalOrders} label="Total Orders" />
          </div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <EmptyState onAdd={openAddDialog} hasSearch={!!searchQuery} />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={() => openEditDialog(product)}
                  onDelete={() => handleDelete(product.id)}
                  onToggle={() => handleToggleAvailability(product)}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <FormInput
              label="Product Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
            <div>
              <label className="
