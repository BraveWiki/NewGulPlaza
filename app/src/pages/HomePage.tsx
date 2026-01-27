import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, Store, Heart, ShoppingBag, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

// Mock data for featured content
const featuredShop = {
  id: '1',
  name: "Hina's Boutique",
  tagline: 'Traditional wear & everyday elegance',
  description: 'Handpicked fabrics, honest prices, and a fresh start. Every order helps Hina restock and rebuild.',
  image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
  category: 'Fashion',
};

const categories = [
  { name: 'Fashion & Tailoring', image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80', count: 12 },
  { name: 'Electronics & Repair', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80', count: 8 },
  { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80', count: 15 },
  { name: 'Beauty & Care', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80', count: 6 },
  { name: 'Books & Stationery', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', count: 9 },
  { name: 'Groceries & Spices', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80', count: 11 },
];

const stories = [
  {
    id: '1',
    name: 'Hina Yousuf',
    shop: "Hina's Boutique",
    quote: 'I started with one sewing machine. After the fire, I thought it was over. But the community kept showing up.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  },
  {
    id: '2',
    name: 'Rashid Ahmed',
    shop: 'Rashid Mobile Corner',
    quote: 'Every repair I complete is a step toward rebuilding what we lost. Your trust keeps me going.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    id: '3',
    name: 'Sara Khan',
    shop: 'Home Bakes',
    quote: 'Baking was my passion. Now, with every order, I feel like I am rising again too.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
  },
];

const featuredProducts = [
  {
    id: '1',
    name: 'Hand-embroidered Kurta',
    price: 2400,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80',
    shop: "Hina's Boutique",
  },
  {
    id: '2',
    name: 'Traditional Scarf',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80',
    shop: "Hina's Boutique",
  },
  {
    id: '3',
    name: 'Mobile Repair Service',
    price: 800,
    image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    shop: 'Rashid Mobile Corner',
  },
];

const testimonials = [
  {
    id: '1',
    name: 'Bilal Q.',
    location: 'Lahore',
    orders: 3,
    content: 'Ordered a tailored shirt. Fit perfectly, and the owner called to confirm the size. That is service.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Amina R.',
    location: 'Karachi',
    orders: 5,
    content: 'Knowing my purchase helps someone rebuild their life makes shopping here so meaningful.',
    rating: 5,
  },
];

const stats = [
  { label: 'Shops Supported', value: '45+', icon: Store },
  { label: 'Orders Placed', value: '1,240+', icon: ShoppingBag },
  { label: 'Families Helped', value: '120+', icon: Users },
  { label: 'Donations Received', value: 'Rs 500K+', icon: Heart },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  const handleDonateClick = () => {
    toast.info('Coming Soon!', {
      description: 'Our donation system will be live soon. Thank you for your support!',
    });
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {/* Section 1: Hero - Featured Shop */}
      <section ref={heroRef} className="section-pinned flex items-center justify-center pt-20">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          <div className="paper-card max-w-6xl mx-auto overflow-hidden transform -rotate-1 hover:rotate-0 transition-transform duration-500">
            <div className="grid md:grid-cols-2 gap-0">
              {/* Image Side */}
              <div className="relative h-64 md:h-[500px] overflow-hidden">
                <img 
                  src={featuredShop.image} 
                  alt={featuredShop.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className="tag-accent">Featured Shop</span>
                </div>
              </div>
              
              {/* Content Side */}
              <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-b from-transparent to-black/5">
                <p className="text-[#6E6A63] text-sm font-mono uppercase tracking-wider mb-3">
                  {featuredShop.category}
                </p>
                <h1 className="text-display font-bold text-[#111111] mb-3">
                  {featuredShop.name}
                </h1>
                <p className="text-lg text-[#6E6A63] mb-4">
                  {featuredShop.tagline}
                </p>
                <p className="text-[#111111]/80 mb-8 leading-relaxed">
                  {featuredShop.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to={`/shop/${featuredShop.id}`}>
                    <Button className="btn-primary gap-2">
                      Visit Shop
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link to="/shops">
                    <Button className="btn-outline">
                      Browse All Shops
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="scroll-indicator">
          <span className="text-xs text-[#6E6A63] font-mono uppercase tracking-wider">Scroll</span>
          <ChevronDown className="w-5 h-5 text-[#6E6A63]" />
        </div>
      </section>

      {/* Section 2: Stats Bar */}
      <section className="section-flowing bg-[#111111] py-12">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="w-6 h-6 text-[#D93A3A] mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold text-[#F4EFE6] mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-[#F4EFE6]/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Browse by Category */}
      <section className="section-flowing">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <h2 className="text-headline font-bold text-[#111111] mb-3">
                  Browse by Category
                </h2>
                <p className="text-[#6E6A63] max-w-lg">
                  From tailoring to tech—find shopkeepers who need your support right now.
                </p>
              </div>
              <Link to="/shops" className="mt-4 md:mt-0">
                <Button variant="ghost" className="gap-2 text-[#111111] hover:text-[#D93A3A]">
                  View All Categories
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((category, index) => (
                <Link 
                  key={index} 
                  to="/shops"
                  className="group"
                >
                  <div className="paper-card overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <p className="text-white font-medium text-sm leading-tight">
                          {category.name}
                        </p>
                        <p className="text-white/70 text-xs">
                          {category.count} shops
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Shop Owner Stories */}
      <section className="section-flowing bg-[#111111]/5">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <span className="tag mb-4 inline-block">Stories of Resilience</span>
              <h2 className="text-headline font-bold text-[#111111] mb-4">
                Meet the Shopkeepers
              </h2>
              <p className="text-[#6E6A63] max-w-2xl mx-auto">
                Behind every shop is a story of hope, resilience, and the dream to rebuild. 
                Read their journeys and be part of their comeback.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {stories.map((story, index) => (
                <div 
                  key={story.id}
                  className="paper-card overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                  style={{ transform: `rotate(${index === 0 ? '-1' : index === 2 ? '1' : '0'}deg)` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold text-lg">{story.name}</p>
                      <p className="text-white/80 text-sm">{story.shop}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <blockquote className="text-[#111111]/80 italic leading-relaxed mb-4">
                      "{story.quote}"
                    </blockquote>
                    <Link to="/stories">
                      <Button variant="ghost" className="p-0 h-auto text-[#D93A3A] hover:text-[#C43333] gap-2">
                        Read Full Story
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link to="/stories">
                <Button className="btn-outline">
                  View All Stories
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Donation CTA */}
      <section className="section-flowing">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="accent-card overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <Heart className="w-12 h-12 text-white/80 mb-6" />
                  <h2 className="text-headline font-bold text-white mb-4">
                    Help Them Restock
                  </h2>
                  <p className="text-white/80 leading-relaxed mb-6">
                    100% of donations go toward inventory, tools, and shop repairs. 
                    No platform fees. Every rupee counts toward rebuilding a dream.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/donate">
                      <Button className="bg-white text-[#D93A3A] hover:bg-white/90 gap-2">
                        Donate Now
                        <Heart className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="text-white hover:text-white/80 hover:bg-white/10"
                      onClick={handleDonateClick}
                    >
                      See How Funds Are Used
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80"
                    alt="Community support"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#D93A3A]/30 to-transparent" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Featured Products */}
      <section className="section-flowing">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <h2 className="text-headline font-bold text-[#111111] mb-3">
                  Shop the Collection
                </h2>
                <p className="text-[#6E6A63]">
                  Handpicked products from our featured shopkeepers
                </p>
              </div>
              <Link to="/shops" className="mt-4 md:mt-0">
                <Button variant="ghost" className="gap-2 text-[#111111] hover:text-[#D93A3A]">
                  View All Products
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {featuredProducts.map((product, index) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}`}
                  className="group"
                >
                  <div 
                    className="paper-card overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                    style={{ transform: `rotate(${index === 0 ? '-1' : index === 2 ? '1' : '0'}deg)` }}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-[#D93A3A] text-white px-3 py-1 rounded-full text-sm font-medium">
                          Rs {product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-[#6E6A63] font-mono uppercase tracking-wider mb-2">
                        {product.shop}
                      </p>
                      <h3 className="font-semibold text-[#111111] text-lg mb-2 group-hover:text-[#D93A3A] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#6E6A63]">
                        Cash on Delivery
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: How It Works */}
      <section className="section-flowing bg-[#111111]/5">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-headline font-bold text-[#111111] mb-4">
                How It Works
              </h2>
              <p className="text-[#6E6A63] max-w-2xl mx-auto">
                Supporting local businesses has never been easier. 
                Three simple steps to make a difference.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: '01',
                  title: 'Choose a Shop',
                  description: 'Browse real shop profiles and discover what they sell. Each shop has a unique story.',
                  icon: Store,
                },
                {
                  step: '02',
                  title: 'Place Your Order',
                  description: 'Message or call directly. Pay cash on delivery. No online payment needed.',
                  icon: ShoppingBag,
                },
                {
                  step: '03',
                  title: 'Support Local',
                  description: 'Your order helps them rebuild. Every purchase is a vote for their comeback.',
                  icon: Heart,
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-[#111111] flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-7 h-7 text-[#F4EFE6]" />
                  </div>
                  <span className="text-5xl font-bold text-[#111111]/10 mb-4 block">
                    {item.step}
                  </span>
                  <h3 className="font-semibold text-xl text-[#111111] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#6E6A63] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Testimonials */}
      <section className="section-flowing">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="tag mb-4 inline-block">Testimonials</span>
              <h2 className="text-headline font-bold text-[#111111] mb-4">
                What Buyers Say
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id}
                  className="paper-card p-8 transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#D93A3A] text-[#D93A3A]" />
                    ))}
                  </div>
                  <blockquote className="text-[#111111] text-lg leading-relaxed mb-6">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#111111] flex items-center justify-center">
                      <span className="text-white font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-[#111111]">{testimonial.name}</p>
                      <p className="text-sm text-[#6E6A63]">
                        {testimonial.location} • {testimonial.orders} orders placed
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Final CTA */}
      <section className="section-flowing bg-[#111111]">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-headline font-bold text-[#F4EFE6] mb-6">
              Ready to Support?
            </h2>
            <p className="text-[#F4EFE6]/70 text-lg max-w-2xl mx-auto mb-10">
              Hundreds of shopkeepers are open for orders. Pick a shop. Make an impact. 
              Together, we can rebuild what was lost.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shops">
                <Button className="bg-[#F4EFE6] text-[#111111] hover:bg-white gap-2 px-8 py-6 text-base">
                  Browse Shops
                  <Store className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/vendor/login">
                <Button variant="outline" className="border-[#F4EFE6]/30 text-[#F4EFE6] hover:bg-[#F4EFE6]/10 gap-2 px-8 py-6 text-base">
                  Become a Vendor
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
