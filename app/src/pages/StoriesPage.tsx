// src/pages/StoriesPage.tsx
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, Store, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStories } from '@/hooks/useStories';
import { Skeleton } from '@/components/ui/skeleton';

const impactStats = [
  { label: 'Shopkeepers Supported', value: '45+', icon: Store },
  { label: 'Orders Completed', value: '1,800+', icon: TrendingUp },
  { label: 'Community Jobs Created', value: '120+', icon: Heart },
];

export default function StoriesPage() {
  const { stories, loading, error } = useStories();

  if (error) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Failed to load stories</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] pt-24 pb-16">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="tag mb-4 inline-block">Stories of Resilience</span>
          <h1 className="text-display font-bold text-[#111111] mb-6">
            Meet the Shopkeepers
          </h1>
          <p className="text-lg text-[#6E6A63] leading-relaxed max-w-2xl mx-auto">
            Behind every shop is a story of hope, resilience, and the dream to rebuild. 
            Read their journeys and be part of their comeback.
          </p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="paper-card p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {impactStats.map((stat, index) => (
                <div key={index}>
                  <stat.icon className="w-8 h-8 text-[#D93A3A] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#111111] mb-1">{stat.value}</p>
                  <p className="text-sm text-[#6E6A63]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Story */}
      {!loading && stories.length > 0 && (
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="paper-card overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-80 lg:h-auto overflow-hidden">
                  <img 
                    src={stories[0].image} 
                    alt={stories[0].ownerName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-white/80 text-sm mb-1">{stories[0].city}</p>
                    <p className="text-white text-2xl font-bold">{stories[0].ownerName}</p>
                    <p className="text-white/80">{stories[0].shopName}</p>
                  </div>
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Quote className="w-10 h-10 text-[#D93A3A]/30 mb-4" />
                  <blockquote className="text-xl text-[#111111] italic leading-relaxed mb-6">
                    "{stories[0].quote}"
                  </blockquote>
                  <p className="text-[#111111]/80 leading-relaxed mb-6">
                    {stories[0].fullStory?.split('\n\n')[0] || stories[0].quote}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <span className="tag">{stories[0].category}</span>
                    <span className="text-sm text-[#6E6A63]">{stories[0].impact}</span>
                  </div>
                  <Link to={`/shop/${stories[0].id}`}>
                    <Button className="btn-primary gap-2 w-fit">
                      Visit Shop
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Stories Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-title font-bold text-[#111111] mb-8">
            More Stories of Hope
          </h2>
          
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {stories.slice(1).map((story, index) => (
                <div 
                  key={story.id}
                  className="paper-card overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                  style={{ transform: `rotate(${index % 2 === 0 ? '-0.5' : '0.5'}deg)` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={story.image} 
                      alt={story.ownerName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-semibold text-lg">{story.ownerName}</p>
                      <p className="text-white/80 text-sm">{story.shopName}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <Quote className="w-6 h-6 text-[#D93A3A]/30 mb-3" />
                    <blockquote className="text-[#111111]/80 italic mb-4 line-clamp-3">
                      "{story.quote}"
                    </blockquote>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="tag text-xs">{story.category}</span>
                      <span className="text-xs text-[#6E6A63]">{story.city}</span>
                    </div>
                    <Link to={`/shop/${story.id}`}>
                      <Button variant="ghost" className="p-0 h-auto text-[#D93A3A] hover:text-[#C43333] gap-2">
                        Read Full Story
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="accent-card p-8 md:p-12 text-center">
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-headline font-bold text-white mb-4">
              Be Part of Their Story
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              Every purchase you make helps these shopkeepers rebuild their lives. 
              Browse their shops and support local businesses today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shops">
                <Button className="bg-white text-[#D93A3A] hover:bg-white/90 gap-2">
                  <Store className="w-4 h-4" />
                  Browse All Shops
                </Button>
              </Link>
              <Link to="/donate">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                  <Heart className="w-4 h-4" />
                  Make a Donation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
