// src/pages/ShopPage.tsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ArrowLeft, Star, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShop } from '@/hooks/useShops';
import { useProducts } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';

export default function ShopPage() {
  const { shopId } = useParams<{ shopId: string }>();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const { shop, loading: shopLoading, error: shopError } = useShop(shopId || '');
  const { products, loading: productsLoading } = useProducts({ 
    shopId: shopId || '',
    available: true 
  });

  const categories = ['All', ...new Set(products.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleWhatsAppClick = () => {
    if (!shop) return;
    const message = `Assalamualaikum! I found your shop on GulPlaza Marketplace. I'm interested in your products.`;
    const whatsappUrl = `https://wa.me/${shop.whatsapp?.replace(/\D/g, '') || shop.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    if (!shop) return;
    window.location.href = `tel:${shop.phone}`;
  };

  if (shopLoading) {
    return <ShopPageSkeleton />;
  }

  if (shopError || !shop) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] pt-20 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Shop not found</p>
          <Link to="/shops">
            <Button>Browse All Shops</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] pt-20 pb-16">
      {/* Back Navigation */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
        <Link to="/shops">
          <Button variant="ghost" className="gap-2 text-[#6E6A63] hover:text-[#111111]">
            <ArrowLeft className="w-4 h-4" />
            Back to Shops
          </Button>
        </Link>
      </div>

      {/* Shop Header */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="paper-card overflow-hidden">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-64 md:h-[400px] overflow-hidden">
                <img 
                  src={shop.image} 
                  alt={shop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag bg-white/90 text-[#111111]">{shop.category}</span>
                    {shop.isVerified && (
                      <span className="bg-[#D93A3A] text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h1 className="text-display font-bold text-[#111111] mb-2">
                  {shop.name}
                </h1>
                <p className="text-lg text-[#6E6A63] mb-4">
                  {shop.description?.substring(0, 100)}...
                </p>
                <p className="text-[#111111]/80 leading-relaxed mb-6">
                  {shop.story?.substring(0, 200)}...
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#D93A3A]" />
                    <span className="text-sm text-[#111111]">
                      <strong>{shop.productsCount}</strong> Products
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#D93A3A]" />
                    <span className="text-sm text-[#111111]">
                      <strong>{shop.rating}</strong> Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D93A3A]" />
                    <span className="text-sm text-[#111111]">{shop.city}</span>
                  </div>
                </div>

                {/* Contact Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button 
                    className="btn-primary gap-2"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </Button>
                  <Button 
                    className="btn-outline gap-2"
                    onClick={handleCallClick}
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-title font-bold text-[#111111] mb-2">
                Products
              </h2>
              <p className="text-[#6E6A63]">
                Browse and order directly via WhatsApp or phone
              </p>
            </div>
            
            {/* Category Filter */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#111111] text-[#F4EFE6]'
                        : 'bg-white text-[#111111] hover:bg-[#111111]/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Products Grid */}
          {productsLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}?shop=${shopId}`}
                  className="group"
                >
                  <div className="paper-card overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.originalPrice && (
                        <div className="absolute top-3 left-3">
                          <span className="bg-[#D93A3A] text-white px-2 py-1 rounded-full text-xs font-medium">
                            Sale
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.stock <= 3 
                            ? 'bg-[#D93A3A] text-white' 
                            : 'bg-white/90 text-[#111111]'
                        }`}>
                          {product.stock <= 3 ? `Only ${product.stock} left` : `${product.stock} in stock`}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-[#6E6A63] font-mono uppercase tracking-wider mb-2">
                        {product.category}
                      </p>
                      <h3 className="font-semibold text-[#111111] text-lg mb-2 group-hover:text-[#D93A3A] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#6E6A63] mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-[#111111]">
                          Rs {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-[#6E6A63] line-through">
                            Rs {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!productsLoading && filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-[#6E6A63]/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#111111] mb-2">
                No products in this category
              </h3>
              <p className="text-[#6E6A63]">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ShopPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#F4EFE6] pt-20 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-8">
        <Skeleton className="h-[400px] w-full rounded-2xl" />
      </div>
    </div>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="paper-card overflow-hidden">
      <Skeleton className="h-56 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-24" />
      </div>
    </div>
  );
}
