// src/pages/VendorProducts.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useProducts } from '@/hooks/useProducts';
import { productService } from '@/services/productService';
import { shopService } from '@/services/shopService';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '@/types';

const categories = ['Kurtas', 'Suits', 'Accessories', 'Fabrics', 'Bridal', 'Electronics', 'Food', 'Beauty'];

export default function VendorProducts() {
  const { shopId, currentUser } = useAuth();
  const { products, loading, refetch } = useProducts({ shopId: shopId || '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    originalPrice: '',
    stock: '',
    category: '',
    image: '',
  });

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const resetForm = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!shopId || !currentUser) {
      toast.error('You must be logged in as a vendor');
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
        originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
        stock: parseInt(formData.stock),
        category: formData.category,
        image: formData.image || 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
        shopId: shopId,
        shopName: currentUser.displayName || 'My Shop',
        isAvailable: parseInt(formData.stock) > 0,
      };

      if (editingProduct) {
        await productService.updateProduct(editingProduct.id, productData);
        toast.success('Product updated successfully!');
      } else {
        await productService.createProduct(productData);
        await shopService.incrementProductsCount(shopId, 1);
        toast.success('Product added successfully!');
      }

      resetForm();
      setIsDialogOpen(false);
      refetch();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error('Failed to save product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || '',
      stock: product.stock.toString(),
      category: product.category,
      image: product.image,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await productService.deleteProduct(productId);
      if (shopId) {
        await shopService.incrementProductsCount(shopId, -1);
      }
      toast.success('Product deleted successfully!');
      refetch();
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  const handleToggleAvailability = async (product: Product) => {
    try {
      await productService.updateProduct(product.id, {
        isAvailable: !product.isAvailable
      });
      toast.success(`Product ${product.isAvailable ? 'disabled' : 'enabled'} successfully!`);
      refetch();
    } catch (error) {
      toast.error('Failed to update product');
    }
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
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
              <h1 className="text-xl font-bold">Products</h1>
              <p className="text-white/60 text-sm">Manage your product catalog</p>
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
          {/* Search Bar */}
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

          {/* Products Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-[#111111]">{products.length}</p>
              <p className="text-sm text-[#6E6A63]">Total Products</p>
            </div>
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-[#111111]">
                {products.filter(p => p.isAvailable).length}
              </p>
              <p className="text-sm text-[#6E6A63]">Available</p>
            </div>
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-[#111111]">
                {products.filter(p => p.stock <= 5).length}
              </p>
              <p className="text-sm text-[#6E6A63]">Low Stock</p>
            </div>
            <div className="paper-card p-4">
              <p className="text-2xl font-bold text-[#111111]">
                {products.reduce((acc, p) => acc + p.orders, 0)}
              </p>
              <p className="text-sm text-[#6E6A63]">Total Orders</p>
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="paper-card overflow-hidden">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-[#111111] text-white px-4 py-2 rounded-full text-sm font-medium">
                          Out of Stock
                        </span>
                      </div>
                    )}
                    {product.stock <= 5 && product.stock > 0 && (
                      <div className="absolute top-3 left-3">
                        <span className="bg-[#D93A3A] text-white px-2 py-1 rounded-full text-xs font-medium">
                          Only {product.stock} left
                        </span>
                      </div>
                    )}
                    {product.originalPrice && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Sale
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="tag text-xs mb-2 inline-block">{product.category}</span>
                        <h3 className="font-semibold text-[#111111]">{product.name}</h3>
                      </div>
                    </div>
                    
                    <p className="text-sm text-[#6E6A63] mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xl font-bold text-[#111111]">
                        Rs {product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-[#6E6A63] line-through">
                          Rs {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-[#6E6A63] mb-4">
                      <span>Stock: {product.stock}</span>
                      <span>{product.views} views</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => handleEdit(product)}
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className={`flex-1 gap-1 ${product.isAvailable ? 'text-green-600' : 'text-amber-600'}`}
                        onClick={() => handleToggleAvailability(product)}
                      >
                        {product.isAvailable ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                        {product.isAvailable ? 'Active' : 'Inactive'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[#D93A3A] hover:bg-[#D93A3A]/10"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-[#6E6A63]/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#111111] mb-2">
                No products found
              </h3>
              <p className="text-[#6E6A63] mb-6">
                {searchQuery ? 'Try adjusting your search' : 'Start by adding your first product'}
              </p>
              {!searchQuery && (
                <Button 
                  className="btn-primary gap-2"
                  onClick={openAddDialog}
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              )}
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
            <div>
              <label className="text-sm text-[#6E6A63] mb-1 block">Product Name *</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
                className="bg-white border-[#111111]/10"
                required
              />
            </div>

            <div>
              <label className="text-sm text-[#6E6A63] mb-1 block">Description</label>
              <Textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                className="bg-white border-[#111111]/10"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6E6A63] mb-1 block">Price (Rs) *</label>
                <Input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="2400"
                  className="bg-white border-[#111111]/10"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-[#6E6A63] mb-1 block">Original Price (Optional)</label>
                <Input
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  placeholder="3200"
                  className="bg-white border-[#111111]/10"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#6E6A63] mb-1 block">Stock *</label>
                <Input
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="10"
                  className="bg-white border-[#111111]/10"
                  required
                />
              </div>
              <div>
                <label className="text-sm text-[#6E6A63] mb-1 block">Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 rounded-lg border border-[#111111]/10 bg-white"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm text-[#6E6A63] mb-1 block">Image URL</label>
              <Input
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className="bg-white border-[#111111]/10"
              />
              <p className="text-xs text-[#6E6A63] mt-1">
                Leave empty to use default image
              </p>
            </div>

            <div className="flex gap-3 pt-4">
              <Button 
                type="submit" 
                className="flex-1 btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  editingProduct ? 'Update Product' : 'Add Product'
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsDialogOpen(false);
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="paper-card overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
