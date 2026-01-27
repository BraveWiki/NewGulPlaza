import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, MessageCircle, ArrowLeft, Star, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for shop details
const shopData = {
  id: '1',
  name: "Hina's Boutique",
  tagline: 'Traditional wear & everyday elegance',
  description: 'Hina\'s Boutique offers handpicked fabrics and traditional wear at honest prices. After losing everything in the fire, Hina is rebuilding her dream one stitch at a time. Every order helps her restock materials and serve the community better.',
  story: 'I started with one sewing machine in my mother\'s garage. Over five years, I built a small but loyal customer base. When the fire destroyed GulPlaza, I lost not just my inventory but also years of hard work. But the community support has been overwhelming. Today, I\'m stitching again—stronger and more determined than ever.',
  category: 'Fashion',
  city: 'Lahore',
  address: 'Shop #45, GulPlaza Market, Main Boulevard, Lahore',
  phone: '+92-300-1234567',
  whatsapp: '+92-300-1234567',
  email: 'hina.boutique@example.com',
  image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
  ownerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  ownerName: 'Hina Yousuf',
  isVerified: true,
  isFeatured: true,
  joinedDate: 'March 2024',
  productsCount: 24,
  ordersCompleted: 156,
  rating: 4.8,
};

// Mock products for this shop
const shopProducts = [
  {
    id: '1',
    name: 'Hand-embroidered Kurta',
    description: 'Beautiful hand-embroidered cotton kurta with traditional patterns.',
    price: 2400,
    originalPrice: 3200,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    stock: 5,
    category: 'Kurtas',
  },
  {
    id: '2',
    name: 'Traditional Scarf',
    description: 'Soft silk scarf with intricate designs.',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80',
    stock: 12,
    category: 'Accessories',
  },
  {
    id: '3',
    name: 'Stitched Cotton Suit',
    description: 'Ready-to-wear three-piece cotton suit.',
    price: 3500,
    originalPrice: 4500,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    stock: 3,
    category: 'Suits',
  },
  {
    id: '4',
    name: 'Embroidered Dupatta',
    description: 'Heavy embroidered dupatta for special occasions.',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    stock: 8,
    category: 'Accessories',
  },
  {
    id: '5',
    name: 'Lawn Collection 2024',
    description: 'Premium lawn fabric with digital prints.',
    price: 2800,
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    stock: 15,
    category: 'Fabrics',
  },
  {
    id: '6',
    name: 'Bridal Lehenga',
    description: 'Stunning bridal lehenga with heavy embroidery.',
    price: 15000,
    originalPrice: 22000,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    stock: 2,
    category: 'Bridal',
  },
];

export default function ShopPage() {
  const { shopId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(shopProducts.map(p => p.category))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? shopProducts 
    : shopProducts.filter(p => p.category === selectedCategory);

  const handleWhatsAppClick = () => {
    const message = `Assalamualaikum! I found your shop on GulPlaza Marketplace. I'm interested in your products.`;
    const whatsappUrl = `https://wa.me/${shopData.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = `tel:${shopData.phone}`;
  };

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
                  src={shopData.image} 
                  alt={shopData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="tag bg-white/90 text-[#111111]">{shopData.category}</span>
                    {shopData.isVerified && (
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
                  {shopData.name}
                </h1>
                <p className="text-lg text-[#6E6A63] mb-4">
                  {shopData.tagline}
                </p>
                <p className="text-[#111111]/80 leading-relaxed mb-6">
                  {shopData.description}
                </p>
                
                {/* Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#D93A3A]" />
                    <span className="text-sm text-[#111111]">
                      <strong>{shopData.productsCount}</strong> Products
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#D93A3A]" />
                    <span className="text-sm text-[#111111]">
                      <strong>{shopData.rating}</strong> Rating
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#D93A3A]" />
                    <span className="text-sm text-[#111111]">{shopData.city}</span>
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

      {/* Owner Story Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="paper-card p-8 md:p-10">
            <div className="grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-1">
                <div className="relative">
                  <img 
                    src={shopData.ownerImage} 
                    alt={shopData.ownerName}
                    className="w-48 h-48 md:w-full md:h-80 object-cover rounded-2xl mx-auto"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-[#D93A3A] text-white px-4 py-2 rounded-full text-sm font-medium">
                    Shop Owner
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <span className="tag mb-4 inline-block">Owner's Story</span>
                <h2 className="text-headline font-bold text-[#111111] mb-4">
                  Meet {shopData.ownerName}
                </h2>
                <blockquote className="text-lg text-[#111111]/80 leading-relaxed italic mb-6">
                  "{shopData.story}"
                </blockquote>
                <div className="flex items-center gap-4 text-sm text-[#6E6A63]">
                  <span>Member since {shopData.joinedDate}</span>
                  <span>•</span>
                  <span>{shopData.ordersCompleted} orders completed</span>
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
          </div>

          {/* Products Grid */}
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

          {/* Empty State */}
          {filteredProducts.length === 0 && (
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

      {/* Contact CTA */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-12">
        <div className="max-w-7xl mx-auto">
          <div className="accent-card p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-3">
              Interested in these products?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Contact {shopData.ownerName} directly via WhatsApp or phone to place your order. 
              Cash on delivery available.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button 
                className="bg-white text-[#D93A3A] hover:bg-white/90 gap-2"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle className="w-4 h-4" />
                Message on WhatsApp
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 gap-2"
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
  );
}
