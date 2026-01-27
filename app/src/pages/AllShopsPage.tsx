import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, ArrowRight, Store, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Mock data for shops
const shops = [
  {
    id: '1',
    name: "Hina's Boutique",
    category: 'Fashion',
    city: 'Lahore',
    phone: '+92-300-1234567',
    description: 'Traditional wear & everyday elegance. Handpicked fabrics, honest prices.',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    isVerified: true,
    isFeatured: true,
    productsCount: 24,
  },
  {
    id: '2',
    name: 'Ali Electronics',
    category: 'Electronics',
    city: 'Karachi',
    phone: '+92-301-2345678',
    description: 'Repairs you can trust—delivered in 48 hours.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80',
    isVerified: true,
    isFeatured: true,
    productsCount: 15,
  },
  {
    id: '3',
    name: 'Rashid Mobile Corner',
    category: 'Electronics',
    city: 'Lahore',
    phone: '+92-302-3456789',
    description: 'Mobile repairs, accessories, and expert advice.',
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    isVerified: true,
    isFeatured: false,
    productsCount: 32,
  },
  {
    id: '4',
    name: 'Sara\'s Home Bakes',
    category: 'Food',
    city: 'Islamabad',
    phone: '+92-303-4567890',
    description: 'Homemade baked goods with love and care.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    isVerified: true,
    isFeatured: true,
    productsCount: 18,
  },
  {
    id: '5',
    name: 'Karim Book Center',
    category: 'Books',
    city: 'Lahore',
    phone: '+92-304-5678901',
    description: 'Educational books, stationery, and office supplies.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    isVerified: false,
    isFeatured: false,
    productsCount: 150,
  },
  {
    id: '6',
    name: 'Ayesha Beauty',
    category: 'Beauty',
    city: 'Karachi',
    phone: '+92-305-6789012',
    description: 'Natural beauty products and skincare essentials.',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    isVerified: true,
    isFeatured: false,
    productsCount: 45,
  },
  {
    id: '7',
    name: 'Faizan Tech Repair',
    category: 'Electronics',
    city: 'Rawalpindi',
    phone: '+92-306-7890123',
    description: 'Laptop and computer repair services at your doorstep.',
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80',
    isVerified: true,
    isFeatured: false,
    productsCount: 8,
  },
  {
    id: '8',
    name: 'Noor Organics',
    category: 'Groceries',
    city: 'Lahore',
    phone: '+92-307-8901234',
    description: 'Organic spices, lentils, and dry fruits.',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    isVerified: true,
    isFeatured: false,
    productsCount: 67,
  },
  {
    id: '9',
    name: 'Zara Stitching',
    category: 'Fashion',
    city: 'Faisalabad',
    phone: '+92-308-9012345',
    description: 'Custom stitching and alterations for all occasions.',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    isVerified: false,
    isFeatured: false,
    productsCount: 12,
  },
];

const categories = ['All', 'Fashion', 'Electronics', 'Food', 'Beauty', 'Books', 'Groceries'];
const cities = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

export default function AllShopsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredShops = shops.filter((shop) => {
    const matchesSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || shop.category === selectedCategory;
    const matchesCity = selectedCity === 'All' || shop.city === selectedCity;
    
    return matchesSearch && matchesCategory && matchesCity;
  });

  const featuredShops = shops.filter(shop => shop.isFeatured);

  return (
    <div className="min-h-screen bg-[#F4EFE6] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-display font-bold text-[#111111] mb-4">
              Shop Directory
            </h1>
            <p className="text-[#6E6A63] text-lg max-w-2xl">
              Discover local shopkeepers who need your support. Browse by category, 
              location, or search for specific products.
            </p>
          </div>

          {/* Featured Shops */}
          <div className="mb-12">
            <h2 className="text-title font-semibold text-[#111111] mb-6 flex items-center gap-2">
              <Store className="w-5 h-5 text-[#D93A3A]" />
              Featured Shops
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredShops.map((shop) => (
                <Link 
                  key={shop.id}
                  to={`/shop/${shop.id}`}
                  className="group"
                >
                  <div className="paper-card overflow-hidden transform hover:-translate-y-2 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={shop.image} 
                        alt={shop.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="tag-accent text-xs">Featured</span>
                      </div>
                      {shop.isVerified && (
                        <div className="absolute top-3 right-3">
                          <span className="bg-white/90 text-[#111111] px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                            <svg className="w-3 h-3 text-[#D93A3A]" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-[#111111] group-hover:text-[#D93A3A] transition-colors">
                          {shop.name}
                        </h3>
                      </div>
                      <p className="text-sm text-[#6E6A63] mb-3 line-clamp-2">
                        {shop.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-[#6E6A63]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {shop.city}
                        </span>
                        <span>{shop.productsCount} products</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                <Input
                  type="text"
                  placeholder="Search shops..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 bg-white border-[#111111]/10 rounded-full text-[#111111] placeholder:text-[#6E6A63]/60"
                />
              </div>
              <Button 
                variant="outline" 
                className="gap-2 border-[#111111]/20"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="mt-4 p-6 paper-card">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-[#111111] mb-3 block">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
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
                  <div>
                    <label className="text-sm font-medium text-[#111111] mb-3 block">
                      City
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {cities.map((city) => (
                        <button
                          key={city}
                          onClick={() => setSelectedCity(city)}
                          className={`px-4 py-2 rounded-full text-sm transition-all ${
                            selectedCity === city
                              ? 'bg-[#111111] text-[#F4EFE6]'
                              : 'bg-white text-[#111111] hover:bg-[#111111]/5'
                          }`}
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-[#6E6A63]">
              Showing <span className="font-medium text-[#111111]">{filteredShops.length}</span> shops
            </p>
          </div>

          {/* Shops Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShops.map((shop) => (
              <Link 
                key={shop.id}
                to={`/shop/${shop.id}`}
                className="group"
              >
                <div className="paper-card overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={shop.image} 
                      alt={shop.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    {shop.isVerified && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-white/90 text-[#111111] px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <svg className="w-3 h-3 text-[#D93A3A]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Verified
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-[#111111] group-hover:text-[#D93A3A] transition-colors">
                        {shop.name}
                      </h3>
                      <span className="tag text-xs">{shop.category}</span>
                    </div>
                    <p className="text-sm text-[#6E6A63] mb-3 line-clamp-2">
                      {shop.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-[#6E6A63]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {shop.city}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {shop.phone}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#6E6A63] group-hover:text-[#D93A3A] transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredShops.length === 0 && (
            <div className="text-center py-16">
              <Store className="w-16 h-16 text-[#6E6A63]/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[#111111] mb-2">
                No shops found
              </h3>
              <p className="text-[#6E6A63]">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
