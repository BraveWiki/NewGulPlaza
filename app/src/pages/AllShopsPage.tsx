// src/pages/AllShopsPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, ArrowRight, Store, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useShops } from '@/hooks/useShops';
import { Skeleton } from '@/components/ui/skeleton';

const categories = ['All', 'Fashion', 'Electronics', 'Food', 'Beauty', 'Books', 'Groceries'];
const cities = ['All', 'Lahore', 'Karachi', 'Islamabad', 'Rawalpindi', 'Faisalabad'];

export default function AllShopsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const { shops, loading, error } = useShops({
    category: selectedCategory,
    city: selectedCity,
    search: searchQuery,
    featured: false
  });

  const featuredShops = shops.filter(shop => shop.isFeatured);
  const filteredShops = shops.filter(shop => {
    const matchesSearch = !searchQuery || 
      shop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load shops</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

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
          {!loading && featuredShops.length > 0 && (
            <div className="mb-12">
              <h2 className="text-title font-semibold text-[#111111] mb-6 flex items-center gap-2">
                <Store className="w-5 h-5 text-[#D93A3A]" />
                Featured Shops
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredShops.map((shop) => (
                  <ShopCard key={shop.id} shop={shop} featured />
                ))}
              </div>
            </div>
          )}

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
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <ShopCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredShops.map((shop) => (
                <ShopCard key={shop.id} shop={shop} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredShops.length === 0 && (
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

// Shop Card Component
function ShopCard({ shop, featured = false }: { shop: any; featured?: boolean }) {
  return (
    <Link to={`/shop/${shop.id}`} className="group">
      <div className="paper-card overflow-hidden transform hover:-translate-y-1 transition-all duration-300 h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={shop.image} 
            alt={shop.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          {featured && (
            <div className="absolute top-3 left-3">
              <span className="tag-accent text-xs">Featured</span>
            </div>
          )}
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
            {!featured && <span className="tag text-xs">{shop.category}</span>}
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
  );
}

function ShopCardSkeleton() {
  return (
    <div className="paper-card overflow-hidden">
      <Skeleton className="h-48 w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );
}
