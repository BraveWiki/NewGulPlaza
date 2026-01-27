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
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

// Mock products data
const initialProducts = [
  {
    id: '1',
    name: 'Hand-embroidered Kurta',
    description: 'Beautiful hand-embroidered cotton kurta with traditional patterns.',
    price: 2400,
    originalPrice: 3200,
    stock: 5,
    category: 'Kurtas',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    isAvailable: true,
    views: 234,
    orders: 12,
  },
  {
    id: '2',
    name: 'Traditional Scarf',
    description: 'Soft silk scarf with intricate designs.',
    price: 1200,
    stock: 12,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80',
    isAvailable: true,
    views: 189,
    orders: 8,
  },
  {
    id: '3',
    name: 'Stitched Cotton Suit',
    description: 'Ready-to-wear three-piece cotton suit.',
    price: 3500,
    originalPrice: 4500,
    stock: 3,
    category: 'Suits',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    isAvailable: true,
    views: 156,
    orders: 6,
  },
  {
    id: '4',
    name: 'Embroidered Dupatta',
    description: 'Heavy embroidered dupatta for special occasions.',
    price: 1800,
    stock: 8,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    isAvailable: false,
    views: 98,
    orders: 4,
  },
];

const categories = ['Kurtas', 'Suits', 'Accessories', 'Fabrics', 'Bridal'];

export default function VendorProducts() {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.stock || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    const productData = {
      id: editingProduct ? editingProduct.id : Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseInt(formData.price),
      originalPrice: formData.originalPrice ? parseInt(formData.originalPrice) : undefined,
      stock: parseInt(formData.stock),
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
      isAvailable: parseInt(formData.stock) > 0,
      views: editingProduct ? editingProduct.views : 0,
      orders: editingProduct ? editingProduct.orders : 0,
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? productData : p));
      toast.success('Product updated successfully!');
    } else {
      setProducts([productData, ...products]);
      toast.success('Product added successfully!');
    }

    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEdit = (product: any) => {
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
    setIsAddDialogOpen(true);
  };

  const handleDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success('Product deleted successfully!');
    }
  };

  const handleToggleAvailability = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
    ));
    toast.success('Product availability updated!');
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
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                className="bg-[#D93A3A] hover:bg-[#C43333] gap-2"
                onClick={() => {
                  resetForm();
                  setIsAddDialogOpen(true);
                }}
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Product</span>
              </Button>
            </DialogTrigger>
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
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsAddDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
                      onClick={() => handleToggleAvailability(product.id)}
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

          {/* Empty State */}
          {filteredProducts.length === 0 && (
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
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
